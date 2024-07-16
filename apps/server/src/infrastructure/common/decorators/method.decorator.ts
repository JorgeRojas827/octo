import { applyDecorators } from '@nestjs/common';

export enum MethodEnum {
  GET = 'Get',
  POST = 'Post',
  PUT = 'Put',
  DELETE = 'Delete',
  PATCH = 'Patch',
}

export const Route = (method: MethodEnum, path: string) => {
  const httpMethod = MethodEnum[method];

  return applyDecorators(httpMethod(path));
};
