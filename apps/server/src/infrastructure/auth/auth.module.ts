import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AuthService } from './service/auth.service';
import { AuthMiddleware } from './middleware/auth.middleware';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { env } from '@infrastructure/configure/configure-loader';
import { JwtStrategy } from './service/jwt.strategy';
import { UserUseCases } from '@application/user/user.use-cases';
import { AuthController } from './controller/auth.controller';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>(env.app.jwt.secret),
        signOptions: {
          expiresIn: configService.get<string>(env.app.jwt.expire),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [AuthService],
  controllers: [AuthController],
  providers: [AuthService, AuthMiddleware, JwtStrategy, UserUseCases],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
