import { GithubService } from '@infrastructure/external-services/github/service/github.service';
import { Controller, Query } from '@nestjs/common';
import { PrivateRoute } from '@infrastructure/common/decorators/auth-method.decorator';
import { MethodEnum } from '@infrastructure/common/enums/method-enum';
import {
  IUserDecorator,
  User,
} from '@infrastructure/common/decorators/user.decorator';

@Controller('github/branches')
export class GithubBranchesController {
  constructor(private readonly githubService: GithubService) {}

  @PrivateRoute(MethodEnum.GET)
  async getRepositoryBranches(
    @Query('repository') repository: string,
    @User() user: IUserDecorator,
  ) {
    return this.githubService.getBranchesByRepository(
      repository,
      user.username,
      user.accessToken,
    );
  }
}
