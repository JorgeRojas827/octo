import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { env } from '@infrastructure/configure/configure-loader';
import { AuthService } from './auth.service';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(env.app.jwt.secret),
    });
  }

  async validate(payload: IJwtPayload) {
    const user = await this.authService.validateUser(payload);

    if (!user) throw new UnauthorizedException();

    return {
      userId: payload.sub,
      email: payload.email,
      username: payload.username,
      accessToken: payload.accessToken,
    };
  }
}
