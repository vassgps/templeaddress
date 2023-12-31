import axios from "axios";
import { getSession } from "next-auth/react";
import { User } from "@/models/interfaces";

const baseURL = `${process.env.NEXT_PUBLIC_BASE_URL}api/`;

const HttpConfig = () => {
  const instance = axios.create({ baseURL, withCredentials: true });

  instance.interceptors.request.use(async (request) => {
    const session = await getSession();
    if (session && (session?.user as User)?.accessToken) {
      request.headers.Authorization = `Bearer ${
        (session?.user as User)?.accessToken
      }`;
    }
    return request;
  });

  instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      if (error.response) {
        const { status } = error.response;
        if (status === 401) {
          localStorage.clear();
          window.location.href = "/login";
        } else if (status === 500) {
          window.location.href = "/server-error";
        } 
      }
      return Promise.reject(error);
    }
  );

  return instance;
};

export default HttpConfig();
