import { httpRequest } from "@/common/helpers/http-request";
import {
  IPullRequestDetailsResponse,
  IPullRequestResponse,
} from "../interfaces/pull-request.interface";

export async function getAllPullRequests(
  repository: string,
  commitSha: string
): Promise<IPullRequestResponse> {
  return await httpRequest({
    url: `/github/pulls?repository=${repository}&commitSha=${commitSha}`,
  });
}

export async function getPullRequestDetails(
  repository: string,
  pullNumber: number
): Promise<IPullRequestDetailsResponse> {
  return await httpRequest({
    url: `/github/pulls/details?repository=${repository}&pullNumber=${pullNumber}`,
  });
}

export async function submitPullRequestReview(
  repository: string,
  pullNumber: string,
  review: string,
  filename: string,
  commitId: string,
  line: number
) {
  return await httpRequest({
    url: `/github/pulls/submit-review`,
    method: "POST",
    body: {
      repository,
      pullNumber,
      review,
      filename,
      commitId,
      line,
    },
  });
}
