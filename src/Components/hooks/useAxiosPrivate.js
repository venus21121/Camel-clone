import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

// This is used for sending Access Token to backened with axios
const useAxiosPrivate = () => {
  const { auth } = useAuth();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => {
        console.error("Request Error:", error); // Log any request error
        return Promise.reject(error);
      }
    );
    // Response interceptor to handle token expiration
    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error?.response?.status === 403) {
          console.log("Token expired or invalid.");
        }
        return Promise.reject(error);
      }
    );
    // Cleanup interceptors when the component is unmounted
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
