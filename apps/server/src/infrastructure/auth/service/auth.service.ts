import { env } from '@infrastructure/configure/configure-loader';
import { I18nTranslations } from '@lib/i18n.generated';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nService } from 'nestjs-i18n';
import { JwtService } from '@nestjs/jwt';

import { UserUseCases } from '@application/user/user.use-cases';
import { IUser } from '@domain/user/interfaces/user.interface';
import { PrismaService } from '../../database/prisma/prisma.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  private readonly apiKey: string;

  constructor(
    private readonly i18n: I18nService<I18nTranslations>,
    private readonly configService: ConfigService,
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly userUseCases: UserUseCases,
  ) {
    this.userUseCases = new UserUseCases(this.prisma);
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

  async validateUser(payload: IJwtPayload): Promise<IUser> {
    return await this.userUseCases.getById(payload.sub);
  }

  async githubAuth(userData: IUser) {
    const user = await this.userUseCases.upsert(userData);

    return {
      access_token: await this.jwtService.signAsync({
        sub: user.id,
        email: user.email,
        username: user.username,
        accessToken: userData.accessToken,
      }),
    };
  }
}
