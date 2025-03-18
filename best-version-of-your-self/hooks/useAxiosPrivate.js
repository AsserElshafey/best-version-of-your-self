"use client";
import { axiosPrivate } from "../api/axios";
import { useEffect } from "react";
import useAuth from "./useAuth";
import { useRouter } from "next/navigation";

const useAxiosPrivate = () => {
  const { getAccessToken, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      config => {
        const token = getAccessToken();
        
        if (!config.headers['Authorization'] && token) {
          config.headers['Authorization'] = `Bearer ${token}`;
          console.log("Added token to request:", config.url);
        }
        return config;
      }, 
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      response => response,
      async (error) => {
        // Handle auth errors (401/403)
        if (error?.response?.status === 401 || error?.response?.status === 403) {
          console.error("Authentication error:", error.response.status);
          logout();
          router.push('/login');
        }
        return Promise.reject(error);
      }
    );

    // Clean up interceptors when component unmounts
    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [getAccessToken, logout, router]);

  return axiosPrivate;
};

export default useAxiosPrivate;