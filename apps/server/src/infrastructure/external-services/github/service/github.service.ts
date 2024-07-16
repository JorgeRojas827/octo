import { UserUseCases } from '@application/user/user.use-cases';
import { env } from '@infrastructure/configure/configure-loader';
import { PrismaService } from '@infrastructure/database/prisma/prisma.service';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
import { Octokit } from '@octokit/rest';
import { I18nService } from 'nestjs-i18n';
import { BranchesResponseDto } from '../dtos/branches-response.dto';

@Injectable()
export class GithubService {
  private logger = new Logger(GithubService.name);
  private octokit: Octokit;

  constructor(
    private readonly prisma: PrismaService,
    private readonly userUseCases: UserUseCases,
    private readonly configService: ConfigService,
    private readonly i18n: I18nService,
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
      const response = await this.octokit.rest.repos.listForUser({
        username,
      });

      return response.data;
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

      const response: BranchesResponseDto[] = branches.data.map((branch) => ({
        name: branch.name,
        commitSha: branch.commit.sha,
      }));

      return response;
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
      const response =
        await this.octokit.rest.repos.listPullRequestsAssociatedWithCommit({
          owner: username,
          repo: repository,
          commit_sha: commitSha,
        });
      return response.data;
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
}
