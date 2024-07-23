import { IHttpResponse } from "@/common/interfaces/http-response.interface";

export interface IBranch {
  name: string;
  commitSha: string;
}

export interface IBranchResponse extends IHttpResponse<IBranch[]> {}
