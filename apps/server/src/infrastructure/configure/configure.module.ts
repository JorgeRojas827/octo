import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { configOptions } from './configure-options';
import { env } from './configure-loader';
import * as path from 'path';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
} from 'nestjs-i18n';

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => [
        {
          ttl: configService.get<number>(env.config.throttle.ttl),
          limit: configService.get<number>(env.config.throttle.limit),
        },
      ],
    }),
    I18nModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        fallbackLanguage: configService.get<string>(
          env.config.lang.defaultLang,
        ),
        loaderOptions: {
          path: path.resolve(__dirname, '../../lib/i18n/'),
          watch: true,
        },
        typesOutputPath: path.join(
          __dirname,
          '../../../src/lib/i18n.generated.ts',
        ),
      }),
      resolvers: [new HeaderResolver(['x-lang']), AcceptLanguageResolver],
    }),
  ],
})
export class ConfigureModule {}
