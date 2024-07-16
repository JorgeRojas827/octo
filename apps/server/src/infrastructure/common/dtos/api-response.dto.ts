import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class ApiResponseDto<T> {
  @Expose()
  statusCode: number;

  @Expose()
  success: boolean;

  @Expose()
  data: T;
}
