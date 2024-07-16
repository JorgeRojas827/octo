import { Controller, Query } from '@nestjs/common';
import { PrivateRoute } from '@infrastructure/common/decorators/auth-method.decorator';
import { MethodEnum } from '@infrastructure/common/enums/method-enum';
import { VercelService } from '../service/vercel.service';

@Controller('vercel')
export class VercelController {
  constructor(private readonly vercelService: VercelService) {}

  @PrivateRoute(MethodEnum.GET)
  async getRepositories(@Query('prompt') prompt) {
    return this.vercelService.generate(prompt);
  }
}
