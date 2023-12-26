import axios from "axios";
import { cookies } from "next/headers";

const baseURL = process.env.NEXT_API_BASE_URL;

const axiosClient = axios.create({
  baseURL,
});

axiosClient.interceptors.request.use(
  (config) => {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
