import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { ExternalServicesModule } from '@infrastructure/external-services/external-services.module';

@Module({
  imports: [UserModule, ExternalServicesModule],
})
export class WrapperModule {}
