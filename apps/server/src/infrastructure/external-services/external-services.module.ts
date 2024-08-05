import { Module } from '@nestjs/common';
import { GithubModule } from './github/github.module';
import { VercelModule } from './vercel/vercel.module';

@Module({
  imports: [GithubModule, VercelModule],
})
export class ExternalServicesModule {}
