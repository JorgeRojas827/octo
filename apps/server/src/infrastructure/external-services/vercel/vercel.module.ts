import { Module } from '@nestjs/common';
import { VercelService } from './service/vercel.service';
import { VercelController } from './controller/vercel.controller';

@Module({
  imports: [],
  providers: [VercelService],
  controllers: [VercelController],
})
export class VercelModule {}
