
import axios from "axios";
import { BASE_URL } from "@/constants/api";
import { TOKEN_IDENTIFIER, REFRESH_TOKEN_IDENTIFIER } from "@/constants";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem(TOKEN_IDENTIFIER);
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
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      try {
        const refreshToken = sessionStorage.getItem(REFRESH_TOKEN_IDENTIFIER);
        const accessToken = sessionStorage.getItem(TOKEN_IDENTIFIER);
        const rs = await axios.post(`${BASE_URL}/v1/users/token/refresh`, {
          access_token: accessToken,
          refresh_token: refreshToken,
        });

        const { access_token, refresh_token } = rs.data;

        sessionStorage.setItem(TOKEN_IDENTIFIER, access_token);
        sessionStorage.setItem(REFRESH_TOKEN_IDENTIFIER, refresh_token);

        axiosInstance.defaults.headers.common["Authorization"] = "Bearer " + access_token;
        originalRequest.headers["Authorization"] = "Bearer " + access_token;

        return axiosInstance(originalRequest);
      } catch (_error) {
        sessionStorage.clear();
        window.location.href = "/sign-in";
        return Promise.reject(_error);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
