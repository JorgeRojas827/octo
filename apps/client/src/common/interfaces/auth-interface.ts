import { IHttpResponse } from "./http-response.interface";

export interface IGithubLoginRequest {
  email?: string | null;
  githubId: string | unknown;
  username: string;
  fullName: string;
}

export interface IGithubLoginResponse
  extends IHttpResponse<IGithubLoginToken> {}

export interface IGithubLoginToken {
  access_token: string;
}
