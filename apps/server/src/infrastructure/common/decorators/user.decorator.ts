import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export interface IUserDecorator {
  userId: string;
  email: string;
  username: string;
  accessToken: string;
}

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext): IUserDecorator => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;

    if (data) return user && user[data];

    return user;
  },
);
