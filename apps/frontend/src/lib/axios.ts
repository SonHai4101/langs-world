import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_URL,
  // timeout: 1000,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    // Read from Zustand's persist storage
    const authStorage = localStorage.getItem("auth-storage");
    if (authStorage) {
      try {
        const { state } = JSON.parse(authStorage);
        const token = state?.accessToken;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Failed to parse auth storage:", error);
      }
    }
    return config;
  },
  function error(error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle 401 Unauthorized errors (token expired or invalid)
    if (error.response?.status === 401) {
      // Clear authentication state when token is expired/invalid
      // We need to import the store dynamically to avoid circular dependency
      import("../store/useAuthStore").then((module) => {
        const useAuthStore = module.default;
        useAuthStore.getState().clearAuth();
      });

      // Optionally redirect to login page
      window.location.href = '/login';
    }

    const errorMessage = "Something went wrong";
    if (error.response) {
      console.log(error);
      throw error.response.data;
    } else {
      throw { ...error, message: errorMessage };
    }
  }
);

export { axiosInstance };
