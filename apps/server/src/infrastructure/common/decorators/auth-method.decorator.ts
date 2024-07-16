// src/common/route.decorator.ts
import { JwtAuthGuard } from '@infrastructure/auth/guards/jwt-guard';
import { applyDecorators, UseGuards } from '@nestjs/common';

export enum Method {
  GET = 'Get',
  POST = 'Post',
  PUT = 'Put',
  DELETE = 'Delete',
  PATCH = 'Patch',
}

export function PrivateRoute(method: Method) {
  return applyDecorators(Method[method](), UseGuards(JwtAuthGuard));
}
