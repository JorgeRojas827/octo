import { GithubService } from '@infrastructure/external-services/github/service/github.service';
import { Controller, Query } from '@nestjs/common';
import { PrivateRoute } from '@infrastructure/common/decorators/auth-method.decorator';
import { MethodEnum } from '@infrastructure/common/enums/method-enum';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @PrivateRoute(MethodEnum.GET, 'repositories')
  async getRepositories(@Query('username') username: string) {
    return this.githubService.getUserRepositories(username);
  }
}
