import { AuthModule } from '@infrastructure/auth/auth.module';
import { ConfigureModule } from '@infrastructure/configure/configure.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { ExternalServicesModule } from '@infrastructure/external-services/external-services.module';
import { Module } from '@nestjs/common';
import { WrapperModule } from '@infrastructure/modules/wrapper.module';

@Module({
  imports: [
    ConfigureModule,
    DatabaseModule,
    WrapperModule,
    AuthModule,
    ExternalServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
