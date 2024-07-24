import { GithubService } from '@infrastructure/external-services/github/service/github.service';
import { Controller, Query } from '@nestjs/common';
import { PrivateRoute } from '@infrastructure/common/decorators/auth-method.decorator';
import { MethodEnum } from '@infrastructure/common/enums/method-enum';
import {
  IUserDecorator,
  User,
} from '@infrastructure/common/decorators/user.decorator';

@Controller('github/pulls')
export class GithubPullsController {
  constructor(private readonly githubService: GithubService) {}

  @PrivateRoute(MethodEnum.GET)
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

  @PrivateRoute(MethodEnum.GET, '/details')
  async getPullRequestDetails(
    @Query('repository') repository: string,
    @Query('pullNumber') pullNumber: string,
    @User() user: IUserDecorator,
  ) {
    return this.githubService.getPullRequestDetails(
      repository,
      user.username,
      Number(pullNumber),
    );
  }

  @PrivateRoute(MethodEnum.GET, '/files')
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

  @PrivateRoute(MethodEnum.POST, '/start-review')
  async pullRequestStartReview(
    @Query('repository') repository: string,
    @Query('pullNumber') pullNumber: string,
    @User() user: IUserDecorator,
  ) {
    return this.githubService.pullRequestStartReview(
      repository,
      user.username,
      Number(pullNumber),
    );
  }
}
