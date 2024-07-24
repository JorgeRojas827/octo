import { IHttpResponse } from "@/common/interfaces/http-response.interface";

export interface IAIReview {
    filename: string;
    automatedReview: string;
}

export interface IAIReviewResponse extends IHttpResponse<IAIReview[]> {} 
