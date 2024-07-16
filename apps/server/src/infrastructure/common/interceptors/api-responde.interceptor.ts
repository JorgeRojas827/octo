import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ApiResponseDto } from '../dtos/api-response.dto';
import { Reflector } from '@nestjs/core';
import { classToPlain } from 'class-transformer';

@Injectable()
export class ApiResponseInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => {
        const response = context.switchToHttp().getResponse();
        const statusCode = response.statusCode.toString();

        const apiResponse = new ApiResponseDto<typeof data>();
        apiResponse.statusCode = Number(statusCode);
        apiResponse.success = statusCode.startsWith('2');
        apiResponse.data = data;

        return classToPlain(apiResponse, { excludeExtraneousValues: true });
      }),
    );
  }
}
