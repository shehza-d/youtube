import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { AppDispatch } from "../types";
import { wasUserLoggedIn, reset, logout } from "../store/auth/authSlice";

// logout left
export default function useCheckLoginStatus() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Add a request interceptor
    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
        console.log("interceptor");
        config.withCredentials = true;
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      },
    );

    // Add a response interceptor
    axios.interceptors.response.use(
      function (response) {
        // Any status code that lie within the range of 2xx cause this function to trigger
        // Do something with response data
        return response;
      },
      function (error) {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        // Do something with response error
        if (error.response.status === 401) {
          // dispatch(logout());
        }
        return Promise.reject(error);
      },
    );
  }, []);

  useEffect(() => {
    dispatch(wasUserLoggedIn());
  }, []);

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     try {
  //       const { data } = await axios.get(
  //         `${getUrl()}/api/v1/users/current-user`,
  //         {
  //           withCredentials: true,
  //           headers: {
  //             "Cache-Control": "no-cache",
  //             Pragma: "no-cache",
  //             Expires: "0",
  //           },
  //         },
  //       );

  //       console.log("🚀 ~ file: useCheckLoginStatus.ts:29 ~ ~ data:", data);

  //       // dispatch({ type: "USER_LOGIN", payload: data.data });
  //     } catch (err) {
  //       console.log(
  //         "🚀 ~ file: useCheckLoginStatus.ts:42 ~ checkLoginStatus ~ err:",
  //         err,
  //       );
  //       // dispatch({ type: "USER_LOGOUT" });
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  return {};
}
