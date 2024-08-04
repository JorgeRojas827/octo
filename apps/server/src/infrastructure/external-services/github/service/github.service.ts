import { UserUseCases } from '@application/user/user.use-cases';
import { env } from '@infrastructure/configure/configure-loader';
import { PrismaService } from '@infrastructure/database/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Octokit } from '@octokit/rest';
import { I18nService } from 'nestjs-i18n';
import { BranchesResponseDto } from '../dtos/branches-response.dto';
import { RepositoriesResponseDto } from '../dtos/repositories-response.dto';
import { PullRequestsResponseDto } from '../dtos/pull-requests-response.dto';
import { VercelService } from '@infrastructure/external-services/vercel/service/vercel.service';
import {
  isProgrammingFile,
  delay,
} from '@infrastructure/common/utils/transformers';
import { getMonthName } from '@infrastructure/common/utils/constants';
import * as moment from 'moment';

@Injectable()
export class GithubService {
  private logger = new Logger(GithubService.name);
  private prObjectKey = '{{PR_OBJECT}}';

  constructor(
    private readonly prisma: PrismaService,
    private readonly userUseCases: UserUseCases,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
    private readonly vercelService: VercelService,
  ) {
    this.userUseCases = new UserUseCases(this.prisma);
  }

  configureOctokit(token: string): Octokit {
    return new Octokit({
      auth: token,
      log: {
        debug: (message) => this.logger.log(message),
        info: (message) => this.logger.log(message),
        warn: console.warn,
        error: console.error,
      },
    });
  }

  async getUserRepositories(username: string, accessToken: string) {
    try {
      const octokit = this.configureOctokit(accessToken);
      const repositories = await octokit.rest.repos.listForUser({
        username,
      });

      const response: RepositoriesResponseDto[] = repositories.data.map(
        (repository) => ({
          id: repository.id,
          name: repository.name,
          full_name: repository.full_name,
          html_url: repository.html_url,
          created_at: repository.created_at,
          default_branch: repository.default_branch,
          language: repository.language,
        }),
      );

      return response;
    } catch (error) {
      throw new Error(
        this.i18n.t('github_messages.REPOSITORIES_NOT_FOUND', {
          args: { username, error: error.message },
        }),
      );
    }
  }

  async getPRCountsByMonth(owner: string, repo: string, accessToken: string) {
    const octokit = this.configureOctokit(accessToken);
    const today = new Date();
    const sixMonthsAgo = new Date(today.getFullYear(), today.getMonth() - 6, 1);

    const pullRequests = (
      await octokit.pulls.list({
        repo,
        owner,
        state: 'all',
      })
    ).data.filter((pr) => new Date(pr.created_at) >= sixMonthsAgo);

    const months = Array.from({ length: 6 }, (_, i) => {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      return {
        month: getMonthName(date.getMonth()),
        year: date.getFullYear(),
        date: date,
      };
    }).reverse();

    const prCountsByMonth = months
      .map(({ month, year, date }) => {
        const monthlyPRs = pullRequests.filter((pr) => {
          const createdDate = new Date(pr.created_at);
          return (
            createdDate.getFullYear() === year &&
            createdDate.getMonth() === date.getMonth()
          );
        });

        const totalPRs = monthlyPRs.length;
        const mergedPRs = monthlyPRs.filter((pr) => pr.merged_at).length;

        return totalPRs > 0 || mergedPRs > 0
          ? { month, total: totalPRs, merged: mergedPRs }
          : null;
      })
      .filter(Boolean);

    return prCountsByMonth;
  }

  async getCommitCountsByMonth(
    owner: string,
    repo: string,
    accessToken: string,
  ) {
    const getCommitDate = (commit: any): string =>
      new Date(commit.commit.author?.date ?? commit.commit.committer?.date)
        .toISOString()
        .split('T')[0];

    const octokit = this.configureOctokit(accessToken);
    const commits = await octokit.repos.listCommits({
      owner,
      repo,
    });
    const groupedByDay = commits.data.reduce(
      (acc, commit) => {
        const date = getCommitDate(commit);
        acc[date] = (acc[date] || 0) + 1;
        return acc;
      },
      {} as { [key: string]: number },
    );

    const commitCountsByDay = Object.entries(groupedByDay).map(
      ([date, count]) => ({ date, count }),
    );

    return commitCountsByDay.reverse();
  }

  async getPullRequestDetails(
    repo: string,
    owner: string,
    pull_number: number,
    accessToken: string,
  ) {
    try {
      const octokit = this.configureOctokit(accessToken);
      const { data: pullRequest } = await octokit.pulls.get({
        owner,
        repo,
        pull_number,
      });

      const { data: commits } = await octokit.pulls.listCommits({
        owner,
        repo,
        pull_number,
      });

      const lastCommitDate = commits[commits.length - 1].commit.committer.date;

      const pullRequestDetails = {
        number: pullRequest.number,
        title: pullRequest.title,
        created_at: moment(pullRequest.created_at).fromNow(),
        commits: pullRequest.commits,
        reviewers: pullRequest.requested_reviewers.map(
          (reviewer) => reviewer.login,
        ),
        last_commit_date: moment(lastCommitDate).fromNow(),
        branch: pullRequest.head.ref,
        base_branch: pullRequest.base.ref,
      };

      return pullRequestDetails;
    } catch (error) {
      console.error(`Error fetching pull request details: ${error}`);
    }
  }

  async getBranchesByRepository(
    repository: string,
    username: string,
    accessToken: string,
  ) {
    try {
      const octokit = this.configureOctokit(accessToken);
      const branches = await octokit.rest.repos.listBranches({
        owner: username,
        repo: repository,
      });
      const pulls = await octokit.pulls.list({
        repo: repository,
        owner: username,
        state: 'all',
      });

      const openedPullRequests = pulls.data.filter(
        (pull) => pull.state === 'open',
      );
      const branchesWithOpenPRs = branches.data.filter((branch) =>
        openedPullRequests.some((pr) => pr.head.ref === branch.name),
      );

      const totalPRs = pulls.data.length;
      const openPRs = pulls.data.filter((pr) => pr.state === 'open').length;
      const closedPRs = pulls.data.filter((pr) => pr.state === 'closed').length;
      const mergedPRs = pulls.data.filter((pr) => pr.merged_at !== null).length;

      const prByMonth = await this.getPRCountsByMonth(
        username,
        repository,
        accessToken,
      );
      const commitsByMonth = await this.getCommitCountsByMonth(
        username,
        repository,
        accessToken,
      );
      const timeMetrics = await this.calculateTimeMetrics(
        username,
        repository,
        accessToken,
      );

      const response: BranchesResponseDto[] = branchesWithOpenPRs.map(
        (branch) => ({
          name: branch.name,
          commitSha: branch.commit.sha,
        }),
      );

      return {
        branches: response,
        prChart: {
          prByMonth,
          prMergePercentage: ((mergedPRs / totalPRs) * 100).toFixed(2),
        },
        commitChart: {
          commitsByMonth,
          commitsByMonthAverage:
            commitsByMonth.length > 0
              ? commitsByMonth.reduce((sum, entry) => sum + entry.count, 0) /
                commitsByMonth.length
              : 0,
        },
        timeChart: {
          ...timeMetrics,
        },
        totalPRs,
        openPRs,
        closedPRs,
        mergedPRs,
      };
    } catch (error) {
      throw new Error(
        this.i18n.t('github_messages.BRANCHES_NOT_FOUND', {
          args: { username, error: error.message, repo: repository },
        }),
      );
    }
  }

  async getPullRequestsByCommit(
    repository: string,
    username: string,
    commitSha: string,
    accessToken: string,
  ) {
    try {
      const octokit = this.configureOctokit(accessToken);
      const pullRequests =
        await octokit.rest.repos.listPullRequestsAssociatedWithCommit({
          owner: username,
          repo: repository,
          commit_sha: commitSha,
        });

      const response: PullRequestsResponseDto[] = pullRequests.data
        .filter((pullRequest) => pullRequest.state === 'open')
        .map((pullRequest) => ({
          title: pullRequest.title,
          prNumber: pullRequest.number,
          state: pullRequest.state,
        }));

      return response;
    } catch (error) {
      throw new Error(
        this.i18n.t('github_messages.PULL_REQUESTS_NOT_FOUND', {
          args: { username, error: error.message, repo: repository },
        }),
      );
    }
  }

  async getPullRequestsFiles(
    repository: string,
    username: string,
    pull_number: number,
    accessToken: string,
  ) {
    try {
      const octokit = this.configureOctokit(accessToken);
      const response = await octokit.rest.pulls.listFiles({
        owner: username,
        repo: repository,
        pull_number,
      });
      return response.data;
    } catch (error) {
      throw new Error(
        this.i18n.t('github_messages.FILES_NOT_FOUND', {
          args: {
            username,
            error: error.message,
            repo: repository,
            pull_number,
          },
        }),
      );
    }
  }

  async pullRequestStartReview(
    repository: string,
    username: string,
    pull_number: number,
    accessToken: string,
  ) {
    const files = await this.getPullRequestsFiles(
      repository,
      username,
      pull_number,
      accessToken,
    );

    const USER_PROMPT = this.configService.get<string>(
      env.externalServices.google.userPrompt,
    );
    const batchSize = 5;
    const concurrencyLimit = 3;

    const programmingFiles = files.filter((file) =>
      isProgrammingFile(file.filename),
    );

    const results = [];

    for (let i = 0; i < programmingFiles.length; i += batchSize) {
      const batch = programmingFiles.slice(i, i + batchSize);
      let activeTasks = 0;
      const batchResults = [];

      for (const file of batch) {
        while (activeTasks >= concurrencyLimit) {
          await delay(100);
        }

        activeTasks++;

        this.processFile(file, USER_PROMPT)
          .then((result) => {
            batchResults.push(result);
            activeTasks--;
          })
          .catch(() => {
            activeTasks--;
          });
      }

      while (activeTasks > 0) {
        await delay(100);
      }

      results.push(...batchResults);
    }

    return results;
  }

  async calculateTimeMetrics(owner: string, repo: string, accessToken: string) {
    const octokit = this.configureOctokit(accessToken);
    const pullRequests = await octokit.pulls.list({
      owner,
      repo,
      state: 'all',
    });
    const prs = await Promise.all(
      pullRequests.data.map(async (pr) => {
        const reviews = await octokit.pulls.listReviews({
          owner,
          repo,
          pull_number: pr.number,
        });
        return {
          created_at: pr.created_at,
          updated_at: pr.updated_at,
          closed_at: pr.closed_at,
          merged_at: pr.merged_at,
          reviews: reviews.data.map((review) => ({
            submitted_at: review.submitted_at,
          })),
        };
      }),
    );

    const transformedPrs = prs.map((pr) => {
      const createdAt = moment(pr.created_at);
      const closedAt = pr.closed_at ? moment(pr.closed_at) : null;
      const mergedAt = pr.merged_at ? moment(pr.merged_at) : null;
      const firstReviewAt =
        pr.reviews.length > 0 ? moment(pr.reviews[0].submitted_at) : null;
      const lastReviewAt =
        pr.reviews.length > 0
          ? moment(pr.reviews[pr.reviews.length - 1].submitted_at)
          : null;

      return {
        openToClose: closedAt ? closedAt.diff(createdAt, 'days') : 0,
        openToMerge: mergedAt ? mergedAt.diff(createdAt, 'days') : 0,
        timeToFirstReview: firstReviewAt
          ? firstReviewAt.diff(createdAt, 'days')
          : 0,
        lastReviewToMerge:
          mergedAt && lastReviewAt ? mergedAt.diff(lastReviewAt, 'days') : 0,
      };
    });

    const avg = (arr: number[]) => arr.reduce((a, b) => a + b, 0) / arr.length;

    const openToClose = avg(transformedPrs.map((m) => m.openToClose));
    const openToMerge = avg(transformedPrs.map((m) => m.openToMerge));
    const timeToFirstReview = avg(
      transformedPrs.map((m) => m.timeToFirstReview),
    );
    const lastReviewToMerge = avg(
      transformedPrs.map((m) => m.lastReviewToMerge),
    );

    return {
      openToClose,
      openToMerge,
      timeToFirstReview,
      lastReviewToMerge,
    };
  }

  async createReviewComment(
    repository: string,
    username: string,
    pull_number: number,
    file: string,
    commitId: string,
    review: string,
    line: number,
    accessToken: string,
  ) {
    try {
      const octokit = this.configureOctokit(accessToken);

      await octokit.rest.pulls.createReviewComment({
        owner: username,
        repo: repository,
        pull_number,
        body: review,
        path: file,
        commit_id: commitId,
        line,
      });
    } catch (error) {
      throw new Error(
        this.i18n.t('github_messages.COMMENT_NOT_CREATED', {
          args: {
            username,
            error: error.message,
            repo: repository,
            pull_number,
          },
        }),
      );
    }
  }

  processFile = async (file: any, userPrompt) => {
    const automatedReview = await this.vercelService.generate(
      userPrompt.replace(this.prObjectKey, JSON.stringify(file.patch)),
    );

    return { filename: file.filename, automatedReview, changes: file.patch };
  };
}
