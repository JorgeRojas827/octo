import { env } from '@infrastructure/configure/configure-loader';
import { I18nTranslations } from '@lib/i18n.generated';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly apiKey: string;

  constructor(
    private readonly configService: ConfigService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {
    this.apiKey = this.configService.get<string>(env.app.key);
  }

  validateApiKey(providedApiKey: string): void {
    if (!providedApiKey) {
      const errorMessage = this.i18n.t('error_messages.API_KEY_MISSING');
      this.logger.warn(errorMessage);
      throw new UnauthorizedException(errorMessage);
    }

    if (this.apiKey !== providedApiKey) {
      const errorMessage = this.i18n.t('error_messages.API_KEY_INVALID', {
        args: { providedApiKey },
      });
      this.logger.warn(errorMessage);
      throw new UnauthorizedException(errorMessage);
    }
  }
}
