import { InternalServerErrorException } from '@nestjs/common';

export const catchError = (method: any) => {
  try {
    return method;
  } catch (error) {
    throw new InternalServerErrorException(error.message);
  }
};
