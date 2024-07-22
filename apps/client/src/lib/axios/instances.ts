import axios from "axios";

export const githubInstance = axios.create({
  baseURL: process.env.GITHUB_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiInstance = axios.create({
  baseURL: process.env.API_URL,
  headers: {
    "Content-Type": "application/json",
    "x-api-key": process.env.API_KEY,
  },
});
