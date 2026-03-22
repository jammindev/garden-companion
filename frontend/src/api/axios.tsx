import axios from "axios";
import { ROOTURL } from "./apiRoutes";
import { getToken } from "@/utils/utils";

// const getToken = () => {
//   const token = localStorage.getItem("JWTGP")
//   if  (!token) {
//     // window.location.href = "/auth/login";
//     console.log("pas de token")
//   }
//   return token;
// };

const axiosInstance = axios.create({
  baseURL: ROOTURL,
  headers: {
    common: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  },
});

axiosInstance.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  console.log("error axios")
  return Promise.reject(error);
});

export const axiosInstanceFile = axios.create({
  baseURL: ROOTURL,
  headers: {
    common: {
      Authorization: `Bearer ${getToken()}`,
      "Content-Type": "multipart/form-data",
    },
  },
});

export const updateTokenInAxiosHeaders = (token: string) => {
  axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  axiosInstanceFile.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

// Add an interceptor to handle 401 errors
axiosInstance.interceptors.response.use(
  (response) => {
    // If the response is successful, return the response as usual
    return response;
  },
  (error) => {
    // Check if the error response has a status code of 401
    if (error.response && error.response.status === 401) {
      // Clear the token from localStorage
      localStorage.removeItem("JWTGP");

      // Redirect to the login page
      window.location.href = "/auth/login"; // Directly redirect to login

      // Or, if using react-router's `useNavigate`:
      // navigate("/login");
    }

    // If it's a different error, return the rejected promise as is
    return Promise.reject(error);
  }
);

// Add an interceptor to handle 401 errors
axiosInstanceFile.interceptors.response.use(
  (response) => {
    // If the response is successful, return the response as usual
    return response;
  },
  (error) => {
    // Check if the error response has a status code of 401
    if (error.response && error.response.status === 401) {
      // Clear the token from localStorage
      localStorage.removeItem("JWTGP");

      // Redirect to the login page
      window.location.href = "/auth/login"; // Directly redirect to login

      // Or, if using react-router's `useNavigate`:
      // navigate("/login");
    }

    // If it's a different error, return the rejected promise as is
    return Promise.reject(error);
  }
);

export default axiosInstance;
