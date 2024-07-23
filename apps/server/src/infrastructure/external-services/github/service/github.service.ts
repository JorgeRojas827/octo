import { UserUseCases } from '@application/user/user.use-cases';
import { env } from '@infrastructure/configure/configure-loader';
import { PrismaService } from '@infrastructure/database/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
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

@Injectable()
export class GithubService {
  private logger = new Logger(GithubService.name);
  private octokit: Octokit;
  private prObjectKey = '{{PR_OBJECT}}';

  constructor(
    private readonly prisma: PrismaService,
    private readonly userUseCases: UserUseCases,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
    private readonly vercelService: VercelService,
  ) {
    this.userUseCases = new UserUseCases(this.prisma);
    this.configureOctokit();
  }

  configureOctokit() {
    this.octokit = new Octokit({
      authStrategy: createOAuthAppAuth,
      auth: {
        clientId: this.configService.get<string>(
          env.externalServices.github.clientId,
        ),
        clientSecret: this.configService.get<string>(
          env.externalServices.github.clientSecret,
        ),
      },
      log: {
        debug: (message) => this.logger.log(message),
        info: (message) => this.logger.log(message),
        warn: console.warn,
        error: console.error,
      },
    });
  }

  async getUserRepositories(username: string) {
    try {
      const repositories = await this.octokit.rest.repos.listForUser({
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

  async getBranchesByRepository(repository: string, username: string) {
    try {
      const branches = await this.octokit.rest.repos.listBranches({
        owner: username,
        repo: repository,
      });

      const pulls = await this.octokit.pulls.list({
        owner: username,
        repo: repository,
        state: 'all',
      });

      const totalPRs = pulls.data.length;
      const openPRs = pulls.data.filter((pr) => pr.state === 'open').length;
      const closedPRs = pulls.data.filter((pr) => pr.state === 'closed').length;
      const mergedPRs = pulls.data.filter((pr) => pr.merged_at !== null).length;

      const response: BranchesResponseDto[] = branches.data.map((branch) => ({
        name: branch.name,
        commitSha: branch.commit.sha,
      }));

      return { branches: response, totalPRs, openPRs, closedPRs, mergedPRs };
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
  ) {
    try {
      const pullRequests =
        await this.octokit.rest.repos.listPullRequestsAssociatedWithCommit({
          owner: username,
          repo: repository,
          commit_sha: commitSha,
        });

      const response: PullRequestsResponseDto[] = pullRequests.data.map(
        (pullRequest) => ({
          title: pullRequest.title,
          prNumber: pullRequest.number,
          state: pullRequest.state,
        }),
      );

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
  ) {
    try {
      const response = await this.octokit.rest.pulls.listFiles({
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
  ) {
    const files = await this.getPullRequestsFiles(
      repository,
      username,
      pull_number,
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

  processFile = async (file: any, userPrompt) => {
    const automatedReview = await this.vercelService.generate(
      userPrompt.replace(this.prObjectKey, JSON.stringify(file.patch)),
    );

    return { filename: file.filename, automatedReview };
  };
}
