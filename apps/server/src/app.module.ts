import { AuthModule } from '@infrastructure/auth/auth.module';
import { ConfigureModule } from '@infrastructure/configure/configure.module';
import { DatabaseModule } from '@infrastructure/database/database.module';
import { ExternalServicesModule } from '@infrastructure/external-services/external-services.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [
    ConfigureModule,
    DatabaseModule,
    AuthModule,
    ExternalServicesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
