import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestExpressApplication } from '@nestjs/platform-express';
import { env } from '@infrastructure/configure/configure-loader';
import { ApiResponseInterceptor } from '@infrastructure/common/interceptors/api-responde.interceptor';

async function bootstrap() {
  const logger = new Logger('Main');

  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  const config = app.get<ConfigService>(ConfigService);

  const reflector = new Reflector();
  app.useGlobalInterceptors(new ApiResponseInterceptor(reflector));
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.enableCors();

  const port = config.get<number>(env.app.port);
  await app.listen(port, () => logger.log(`Server started on port ${port}`));
}
bootstrap();
