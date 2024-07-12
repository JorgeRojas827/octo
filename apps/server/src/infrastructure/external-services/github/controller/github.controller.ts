import { GithubService } from '@infrastructure/external-services/github/service/github.service';
import { Controller, Get, Query } from '@nestjs/common';

@Controller('github')
export class GithubController {
  constructor(private readonly githubService: GithubService) {}

  @Get()
  async getRepositories(@Query('username') username: string) {
    return this.githubService.getUserRepositories(username);
  }
}
