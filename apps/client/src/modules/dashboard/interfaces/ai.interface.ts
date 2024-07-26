import { IHttpResponse } from "@/common/interfaces/http-response.interface";

export interface IAIReview {
  filename: string;
  automatedReview: string;
  changes: string;
}

export interface IAIReviewResponse extends IHttpResponse<IAIReview[]> {}
