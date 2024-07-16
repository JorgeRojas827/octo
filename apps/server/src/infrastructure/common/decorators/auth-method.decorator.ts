import {
  applyDecorators,
  Delete,
  Get,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../auth/guards/jwt-guard';
import { MethodEnum } from '../enums/method-enum';

const methodMap = {
  [MethodEnum.GET]: Get,
  [MethodEnum.POST]: Post,
  [MethodEnum.PUT]: Put,
  [MethodEnum.DELETE]: Delete,
  [MethodEnum.PATCH]: Patch,
};

export const PrivateRoute = (method: MethodEnum, path: string = '') => {
  return applyDecorators(methodMap[method](path), UseGuards(JwtAuthGuard));
};
