import { httpRequest } from "@/common/helpers/http-request";
import { IRepositoryResponse } from "../interfaces/repository.interface";

export async function getAllRepositories(): Promise<IRepositoryResponse> {
  return await httpRequest({
    url: "/github/repositories",
  });
}
