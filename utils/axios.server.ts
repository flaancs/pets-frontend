import axios from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_API_BASE_URL;

const axiosClient = axios.create({
  baseURL,
});

const URLS_WITHOUT_AUTH = ["/auth/login", "/auth/register", "/pets"];

axiosClient.interceptors.request.use(
  (config) => {
    const cookieStore = cookies();
    if (!URLS_WITHOUT_AUTH.includes(config.url || "")) {
      const token = cookieStore.get("authToken")?.value;

      if (!token) {
        throw new Error("Unauthorized");
      }
      config.headers.Authorization = `Token ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      throw new Error("Unauthorized");
    }
    return Promise.reject(error);
  }
);

export default axiosClient;
