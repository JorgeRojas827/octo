import { IHttpResponse } from "@/common/interfaces/http-response.interface";

export interface IPullRequest {
  title: string;
  prNumber: number;
  state: string;
}

export interface IPullRequestCounter {
  totalPRs: number;
  openPRs: number;
  closedPRs: number;
  mergedPRs: number;
}

export interface IPullRequestResponse extends IHttpResponse<IPullRequest[]> {}
