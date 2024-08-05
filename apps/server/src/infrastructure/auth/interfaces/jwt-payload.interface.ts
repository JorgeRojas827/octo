export interface IJwtPayload {
  iat: number;
  exp: number;
  sub: string;
  email: string;
  username: string;
  accessToken: string;
}
