import { AuthModule } from '@infrastructure/auth/auth.module';
import { ConfigureModule } from '@infrastructure/configure/configure.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { Module } from '@nestjs/common';
import { WrapperModule } from '@infrastructure/modules/wrapper.module';

@Module({
  imports: [ConfigureModule, DatabaseModule, WrapperModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
