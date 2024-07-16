import { Module } from '@nestjs/common';
import { GithubService } from './service/github.service';
import { GithubController } from './controller/github.controller';

@Module({
  providers: [GithubService],
  controllers: [GithubController],
})
export class GithubModule {}
