import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserUseCases } from '@application/user/user.use-cases';
import { PrismaService } from '@infrastructure/database/prisma/prisma.service';

@Module({
  controllers: [UserController],
  providers: [UserUseCases, PrismaService],
})
export class UserModule {}
