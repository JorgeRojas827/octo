import { GithubService } from '@infrastructure/external-services/github/service/github.service';
import { Controller, Query } from '@nestjs/common';
import { PrivateRoute } from '@infrastructure/common/decorators/auth-method.decorator';
import { MethodEnum } from '@infrastructure/common/enums/method-enum';
import {
  IUserDecorator,
  User,
} from '@infrastructure/common/decorators/user.decorator';

@Controller('github/repositories')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @PrivateRoute(MethodEnum.GET)
  async getRepositories(@User() user: IUserDecorator) {
    return this.githubService.getUserRepositories(user.username);
  }

  @PrivateRoute(MethodEnum.GET, '/branches')
  async getRepositoryBranches(
    @Query('repository') repository: string,
    @User() user: IUserDecorator,
  ) {
    return this.githubService.getBranchesByRepository(
      repository,
      user.username,
    );
  }

  @PrivateRoute(MethodEnum.GET, '/branches/pull-requests')
  async getPullRequestsCommit(
    @Query('repository') repository: string,
    @Query('commitSha') commitSha: string,
    @User() user: IUserDecorator,
  ) {
    return this.githubService.getPullRequestsByCommit(
      repository,
      user.username,
      commitSha,
    );
  }

  @PrivateRoute(MethodEnum.GET, '/branches/pull-requests-files')
  async getPullRequestsFiles(
    @Query('repository') repository: string,
    @Query('pullNumber') pullNumber: string,
    @User() user: IUserDecorator,
  ) {
    return this.githubService.getPullRequestsFiles(
      repository,
      user.username,
      Number(pullNumber),
    );
  }
}
