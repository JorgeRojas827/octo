import { Module } from '@nestjs/common';
import { VercelService } from './service/vercel.service';

@Module({
  imports: [],
  providers: [VercelService],
  exports: [VercelService],
})
export class VercelModule {}
