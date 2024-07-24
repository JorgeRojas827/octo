import { IHttpResponse } from "@/common/interfaces/http-response.interface";

export interface IRepository {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  created_at: string;
  default_branch: string;
  language?: string;
}

export interface ICommitsChart {
  commitsByMonth: ICommitByMonth[];
  commitsByMonthAverage: number;
}

export interface ICommitByMonth {
  date: string;
  count: number;
}

export interface IRepositoryResponse extends IHttpResponse<IRepository[]> {}
