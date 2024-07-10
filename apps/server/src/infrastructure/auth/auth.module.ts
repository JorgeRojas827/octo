import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthMiddleware } from './middleware/auth.middleware';

@Module({
  exports: [AuthService],
  providers: [AuthService, AuthMiddleware],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
