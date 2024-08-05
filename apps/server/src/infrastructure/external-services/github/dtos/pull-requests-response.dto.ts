export interface PullRequestsResponseDto {
  title: string;
  prNumber: number;
  state: string;
}

export interface PullRequestSubmitDto {
  repository: string;
  commitId: string;
  pullNumber: string;
  review: string;
  filename: string;
  line: number;
}
