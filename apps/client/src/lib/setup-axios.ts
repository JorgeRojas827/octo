import { AxiosError, AxiosResponse } from "axios";
import { apiInstance } from "./axios/instances";
import {
  IGithubLoginRequest,
  IGithubLoginToken,
} from "@/common/interfaces/auth-interface";

const POST_USER_URL = process.env.API_POST_USER_URL!;

apiInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (err: AxiosError) => Promise.reject(err)
);

apiInstance.interceptors.response.use(
  (response) => response,
  (error: AxiosError) => {
    const { data, status } = error.response!;
    switch (status) {
      case 400:
        console.error(data);
        break;
      case 401:
        console.error("unauthorised");
        break;
      case 404:
        console.error("/not-found");
        break;
      case 500:
        console.error("/server-error");
        break;
    }
    return Promise.reject(error);
  }
);

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

const request = {
  post: <T, K>(url: string, body: T) =>
    apiInstance.post<K>(url, body).then(responseBody),
};

const users = {
  register: (body: IGithubLoginRequest) =>
    request.post<IGithubLoginRequest, AxiosResponse<IGithubLoginToken>>(
      POST_USER_URL,
      body
    ),
};

const api = {
  users,
};

export default api;
