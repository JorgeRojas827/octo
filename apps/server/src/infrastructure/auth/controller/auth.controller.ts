import { Controller, Body } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { IUser } from '@domain/user/interfaces/user.interface';
import { Route } from '@infrastructure/common/decorators/method.decorator';
import { MethodEnum } from '@infrastructure/common/enums/method-enum';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Route(MethodEnum.POST, 'github')
  async githubAuth(@Body() userData: IUser) {
    return this.authService.githubAuth(userData);
  }
}
