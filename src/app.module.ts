import { ConfigureModule } from '@infrastructure/configure/configure.module';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AuthModule } from './infrastructure/auth/auth.module';
import { TestController } from './infrastructure/test/test.controller';

@Module({
  imports: [ConfigureModule, DatabaseModule, AuthModule],
  controllers: [TestController],
  providers: [],
})
export class AppModule {}
