"use server";

import { AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { cookies } from "next/headers";

export const requestCookie = async (config: InternalAxiosRequestConfig) => {
  const cookieList = cookies().getAll();

  if (cookieList.length !== 0) {
    let cookieString = "";

    cookieList.forEach((cookie) => {
      cookieString += cookie.name + "=" + cookie.value + "; ";
    });

    config.headers.Cookie = cookieString;
  }

  return config;
};

export const responseCookie = async (response: AxiosResponse) => {
  const setCookieHeader = response.headers["set-cookie"];

  if (setCookieHeader) {
    const cookieList = setCookieHeader.map((setCookie) => {
      return setCookie.split("; ").map((value) => {
        return value.split("=");
      });
    });

    const cookieStore = cookies();
    for (const setCookie of cookieList) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const options: any = {};
      setCookie.slice(1).forEach((option) => {
        options[option[0].charAt(0).toLowerCase() + option[0].slice(1)] =
          option[0] === "Expires" ? new Date(option[1]) : (option[1] ?? true);
      });
      cookieStore.set(setCookie[0][0], setCookie[0][1], options);
    }
  }

  return response;
};
