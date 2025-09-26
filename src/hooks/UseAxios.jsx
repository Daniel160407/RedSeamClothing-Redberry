import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

const useAxios = async (url, method, data = null, config = {}) => {
  try {
    if (Cookies.get("token")) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${Cookies.get("token") || ""}`,
      };
    }
    const response = await apiClient.request({
      url,
      method,
      data,
      ...config,
    });
    return response;
  } catch (error) {
    if (error.response?.status === 401) {
      Object.keys(Cookies.get()).forEach((cookieName) => {
        Cookies.remove(cookieName);
      });
    }
    if (axios.isAxiosError(error)) {
      const errorData = error.response?.data || error.message;
      console.error("API request failed:", {
        url,
        method,
        status: error.response?.status,
        error: error.response?.data || error.message,
      });
      throw error;
    } else {
      throw new Error("An unexpected error occurred");
    }
  }
};

useAxios.get = (url, config = {}) => useAxios(url, "get", null, config);
useAxios.post = (url, data, config = {}) => useAxios(url, "post", data, config);
useAxios.put = (url, data, config = {}) => useAxios(url, "put", data, config);
useAxios.patch = (url, data, config = {}) => useAxios(url, "patch", data, config);
useAxios.delete = (url, config = {}) => useAxios(url, "delete", null, config);

export default useAxios;
