import { IHttpResponse } from "@/common/interfaces/http-response.interface";
import { IPullRequestCounter } from "./pull-request.interface";

export interface IBranch {
  name: string;
  commitSha: string;
}
export interface IBranchMetrics extends IPullRequestCounter {
  branches: IBranch[];
}

export interface IBranchResponse extends IHttpResponse<IBranchMetrics> {}
