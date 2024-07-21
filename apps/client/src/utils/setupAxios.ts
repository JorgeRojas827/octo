import axios, { AxiosError, AxiosResponse } from "axios";
import { getAuth } from "./getAuth";

const PROD_BASE_URL = process.env.PRODUCTION_API_URL;
const DEV_BASE_URL = process.env.DEVELOPMENT_API_URL;
const POST_USER_URL = process.env.USER_POST_URL!;
const API_KEY = process.env.API_KEY;

axios.defaults.baseURL = PROD_BASE_URL || DEV_BASE_URL;

// Create a function that returns the token and validate it

axios.interceptors.request.use(
    (config) => {
      const auth = getAuth()
      if (auth) {
        config.headers.Authorization = `Bearer ${auth}`
      }

      return config
    },
    (err: any) => Promise.reject(err)
  )

axios.interceptors.response.use(
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
  post: <T>(url: string, body: {}) =>
    axios.post<T>(url, body).then(responseBody),
};

const users = {
  register: (body: {}) => request.post<void>(POST_USER_URL, body),
};

const api = {
  users,
};

export default api;
