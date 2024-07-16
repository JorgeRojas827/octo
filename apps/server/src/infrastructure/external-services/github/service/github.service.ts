import { env } from '@infrastructure/configure/configure-loader';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createOAuthAppAuth } from '@octokit/auth-oauth-app';
import { Octokit } from '@octokit/rest';

@Injectable()
export class GithubService {
  private logger = new Logger(GithubService.name);
  private octokit: Octokit;

  constructor(private readonly configService: ConfigService) {
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
        `Failed to fetch repositories for ${username}: ${error.message}`,
      );
    }
  }
}
