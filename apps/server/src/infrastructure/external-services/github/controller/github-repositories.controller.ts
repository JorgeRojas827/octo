import { GithubService } from '@infrastructure/external-services/github/service/github.service';
import { Controller } from '@nestjs/common';
import { PrivateRoute } from '@infrastructure/common/decorators/auth-method.decorator';
import { MethodEnum } from '@infrastructure/common/enums/method-enum';
import {
  IUserDecorator,
  User,
} from '@infrastructure/common/decorators/user.decorator';

@Controller('github/repositories')
export class GithubRepositoriesController {
  constructor(private readonly githubService: GithubService) {}

  @PrivateRoute(MethodEnum.GET)
  async getRepositories(@User() user: IUserDecorator) {
    return this.githubService.getUserRepositories(
      user.username,
      user.accessToken,
    );
  }
}
