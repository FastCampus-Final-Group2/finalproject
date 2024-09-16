import _axios, { AxiosInstance } from "axios";
import { requestCookie, responseCookie } from "./cookies";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || process.env.BACKEND_URL;

const axios: AxiosInstance = _axios.create({
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-store",
  },
  withCredentials: true,
});

axios.interceptors.request.use(async (config) => {
  if (typeof window === "undefined") {
    config.baseURL = BACKEND_URL;

    const cookieConfig = await requestCookie(config);

    return cookieConfig;
  }

  config.baseURL = "/api";

  return config;
});

axios.interceptors.response.use(async (response) => {
  if (typeof window === "undefined") {
    const cookieResponse = await responseCookie(response);

    return cookieResponse;
  }

  return response;
});

export default axios;
