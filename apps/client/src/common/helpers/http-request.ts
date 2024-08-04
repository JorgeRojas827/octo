import { getSession } from "next-auth/react";

type HttpMethods = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

export interface IHttpRequestOptions {
  url: string;
  headers?: Record<string, any>;
  method?: HttpMethods;
  body?: Record<string, any>;
  params?: Record<string, string | number | undefined>;
}

export const httpRequest = async ({
  url,
  headers,
  method = "GET",
  body,
  params,
}: IHttpRequestOptions) => {
  try {
    const session = await getSession();

    const requestHeaders: Record<string, any> = {
      "Content-Type": "application/json",
      "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
      Authorization: `Bearer ${session?.accessToken}`,
    };
    if (headers) {
      Object.keys(headers).forEach((key) => {
        requestHeaders[key] = headers[key];
      });
    }
    if (params) {
      const paramsString = Object.keys(params)
        .filter((key) => params[key] !== undefined || params[key] !== null)
        .map((key) => `${key}=${params[key]}`)
        .join("&");
      url = `${url}?${paramsString}`;
    }

    const path = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${path}${url}`, {
      cache: "no-store",
      method,
      headers: requestHeaders,
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
    const result = await response.json();
    return result;
  } catch (error) {
    return { success: false };
  }
};
