import { IHttpResponse } from "@/common/interfaces/http-response.interface";
import {
  IPullRequestCounter,
  IPullRequestsChart,
} from "./pull-request.interface";
import { ICommitsChart } from "./repository.interface";

export interface IBranch {
  name: string;
  commitSha: string;
}
export interface IBranchMetrics extends IPullRequestCounter {
  branches: IBranch[];
  prChart: IPullRequestsChart;
  commitChart: ICommitsChart;
}

export interface IBranchResponse extends IHttpResponse<IBranchMetrics> {}
