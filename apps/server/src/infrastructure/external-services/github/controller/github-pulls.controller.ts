import { GithubService } from '@infrastructure/external-services/github/service/github.service';
import { Body, Controller, Query } from '@nestjs/common';
import { PrivateRoute } from '@infrastructure/common/decorators/auth-method.decorator';
import { MethodEnum } from '@infrastructure/common/enums/method-enum';
import {
  IUserDecorator,
  User,
} from '@infrastructure/common/decorators/user.decorator';
import { PullRequestSubmitDto } from '../dtos/pull-requests-response.dto';

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
      user.accessToken,
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
      user.accessToken,
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
      user.accessToken,
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
      user.accessToken,
    );
  }

  @PrivateRoute(MethodEnum.POST, '/submit-review')
  async pullRequestSubmitReview(
    @Body() body: PullRequestSubmitDto,
    @User() user: IUserDecorator,
  ) {
    return this.githubService.createReviewComment(
      body.repository,
      user.username,
      Number(body.pullNumber),
      body.filename,
      body.commitId,
      body.review,
      Number(body.line),
      user.accessToken,
    );
  }
}
