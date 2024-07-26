import { httpRequest } from "@/common/helpers/http-request";
import { IAIReviewResponse } from "../interfaces/ai.interface";

export default async function getAIReview(repository: string, pullNumber: string): Promise<IAIReviewResponse> {
    return await httpRequest({
        url: `/github/pulls/start-review?repository=${repository}&pullNumber=${pullNumber}`,
        method: "POST"
    })
}