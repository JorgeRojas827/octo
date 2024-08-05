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
  I18nOptionsWithoutResolvers,
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
      useFactory: (configService: ConfigService) => {
        const config: I18nOptionsWithoutResolvers = {
          fallbackLanguage: configService.get<string>(
            env.config.lang.defaultLang,
          ),
          loaderOptions: {
            path: path.resolve(__dirname, '../../lib/i18n/'),
            watch: false,
          },
        };

        if (process.env.NODE_ENV === 'development')
          config.typesOutputPath = path.join(
            __dirname,
            '../../../src/lib/i18n.generated.ts',
          );

        return config;
      },
      resolvers: [new HeaderResolver(['x-lang']), AcceptLanguageResolver],
    }),
  ],
})
export class ConfigureModule {}
