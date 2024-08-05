export interface IHttpResponse<T> {
  statusCode: number;
  success: boolean;
  data: T;
}
