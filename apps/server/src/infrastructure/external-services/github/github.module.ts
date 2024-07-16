import { Module } from '@nestjs/common';
import { GithubService } from './service/github.service';
import { GithubController } from './controller/github.controller';
import { UserModule } from '@infrastructure/modules/user/user.module';
import { UserUseCases } from '@application/user/user.use-cases';
import { PrismaService } from '@infrastructure/database/prisma/prisma.service';

@Module({
  imports: [UserModule],
  providers: [GithubService, UserUseCases, PrismaService],
  controllers: [GithubController],
})
export class GithubModule {}
