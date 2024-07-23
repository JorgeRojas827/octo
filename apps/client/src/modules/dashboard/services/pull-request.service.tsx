import { httpRequest } from "@/common/helpers/http-request";
import { IBranchResponse } from "../interfaces/branch.interface";
import { IPullRequestResponse } from "../interfaces/pull-request.interface";

export async function getAllPullRequests(
  repository: string,
  commitSha: string
): Promise<IPullRequestResponse> {
  return await httpRequest({
    url: `/github/pulls?repository=${repository}&commitSha=${commitSha}`,
  });
}
