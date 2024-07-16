import { InternalServerErrorException } from '@nestjs/common';

export const catchError = (method: any): ReturnType<typeof method> => {
  try {
    return method;
  } catch (error) {
    throw new InternalServerErrorException(error.message);
  }
};
