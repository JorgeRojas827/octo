import { AxiosError, AxiosInstance, AxiosResponse } from "axios";
import { apiInstance } from "../../lib/axios/instances";
import {
  IGithubLoginRequest,
  IGithubLoginToken,
} from "@/common/interfaces/auth-interface";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
import { authOptions } from "@/lib/auth";

const POST_USER_URL = process.env.API_POST_USER_URL!;

export const setupAxios = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const session = await getServerSession(authOptions);

      axiosInstance.defaults.headers.common["Authorization"] =
        `Bearer ${session?.accessToken}`;
      axiosInstance.defaults.headers["x-api-key"] =
        process.env.NEXT_PUBLIC_API_KEY!;

      return config;
    },
    (err: AxiosError) => Promise.reject(err)
  );

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
      const { data, status } = error.response!;
      switch (status) {
        case 400:
          console.error(data);
          break;
        case 401:
          signOut();
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
};

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
