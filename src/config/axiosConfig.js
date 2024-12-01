import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BACK_API,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const { status } = error.response;
      const currentPath = window.location.pathname;

      if (status === 401 && currentPath !== "/login") {
        window.location.href = "/login";
      }

      if (status === 403) {
        window.location.href = "/";
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
