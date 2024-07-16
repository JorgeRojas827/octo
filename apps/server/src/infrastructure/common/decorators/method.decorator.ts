import { applyDecorators, Delete, Get, Patch, Post, Put } from '@nestjs/common';
import { MethodEnum } from '../enums/method-enum';

const methodMap = {
  [MethodEnum.GET]: Get,
  [MethodEnum.POST]: Post,
  [MethodEnum.PUT]: Put,
  [MethodEnum.DELETE]: Delete,
  [MethodEnum.PATCH]: Patch,
};

export const Route = (method: MethodEnum, path: string) => {
  return applyDecorators(methodMap[method](path));
};
