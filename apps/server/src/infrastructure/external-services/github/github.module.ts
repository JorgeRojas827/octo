import { Module } from '@nestjs/common';
import { GithubService } from './service/github.service';
import { UserModule } from '@infrastructure/modules/user/user.module';
import { UserUseCases } from '@application/user/user.use-cases';
import { PrismaService } from '@infrastructure/database/prisma/prisma.service';
import { VercelModule } from '../vercel/vercel.module';
import { GithubBranchesController } from './controller/github-branches.controller';
import { GithubPullsController } from './controller/github-pulls.controller';
import { GithubRepositoriesController } from './controller/github-repositories.controller';

@Module({
  imports: [UserModule, VercelModule],
  providers: [GithubService, UserUseCases, PrismaService],
  controllers: [
    GithubBranchesController,
    GithubPullsController,
    GithubRepositoriesController,
  ],
})
export class GithubModule {}
