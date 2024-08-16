import axios from "axios";
import { isValidErrorFormat } from "../util";

const backendApiTimeout = import.meta.env.VITE_BACKEND_API_TIMEOUT
  ? import.meta.env.VITE_BACKEND_API_TIMEOUT
  : 60000;

const axiosInstance = axios.create({
  timeout: backendApiTimeout,
  withCredentials: true,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorResponse = error?.response?.data?.error;

    if (isValidErrorFormat(errorResponse)) {
      return Promise.reject({ ...errorResponse });
    } else {
      return Promise.reject({
        code: "UNHANDLED_ERROR",
        category: "UNKNOWN_ERROR",
      });
    }
  }
);
axiosInstance.interceptors.request.use(
  (response) => response,
  (error) => {
    const errorResponse = error?.response?.data;
    return Promise.reject({
      errorCode: errorResponse.errorCode,
      errorType: "BUSINESS_ERROR",
    });
  }
);

export default axiosInstance;
