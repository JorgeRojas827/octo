import { IHttpResponse } from "@/common/interfaces/http-response.interface";

export interface IPullRequest {
  title: string;
  prNumber: number;
  state: string;
}

export interface IPullRequestDetails {
  number: number;
  title: string;
  created_at: string;
  commits: number;
  reviewers: string[];
  last_commit_date: string;
  branch: string;
  base_branch: string;
}

export interface IPullRequestCounter {
  totalPRs: number;
  openPRs: number;
  closedPRs: number;
  mergedPRs: number;
}

export interface IPullRequestsChart {
  prByMonth: IPullRequestByMonth[];
  prMergePercentage: string;
}

export interface IPullRequestTimeChart {
  openToClose: number;
  openToMerge: number;
  timeToFirstReview: number;
  lastReviewToMerge: number;
}

export interface IPullRequestByMonth {
  month: string;
  total: number;
  merged: number;
}

export interface IPullRequestResponse extends IHttpResponse<IPullRequest[]> {}
export interface IPullRequestDetailsResponse
  extends IHttpResponse<IPullRequestDetails> {}
