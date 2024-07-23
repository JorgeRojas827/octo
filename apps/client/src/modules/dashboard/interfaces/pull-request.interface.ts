import { IHttpResponse } from "@/common/interfaces/http-response.interface";

export interface IPullRequest {
  title: string;
  prNumber: number;
  state: string;
}

export interface IPullRequestResponse extends IHttpResponse<IPullRequest[]> {}
