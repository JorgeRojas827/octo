import { httpRequest } from "@/common/helpers/http-request";
import { IBranchResponse } from "../interfaces/branch.interface";

export async function getAllBranches(
  repository: string
): Promise<IBranchResponse> {
  return await httpRequest({
    url: `/github/branches?repository=${repository}`,
  });
}
