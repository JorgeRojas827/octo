import axios from "axios";

export const githubInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_GITHUB_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.NEXT_PUBLIC_API_KEY,
  },
});
