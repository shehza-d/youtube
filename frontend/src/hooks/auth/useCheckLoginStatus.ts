import { useEffect } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import { AppDispatch } from "../../types";
import { addUser, removeUser } from "../../store/auth/authSlice";
import { pingToGetAuthenticatedUser } from "../../lib/api";

export default function useCheckLoginStatus() {
  //
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    // Add a request interceptor
    axios.interceptors.request.use(
      function (config) {
        // Do something before request is sent
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
          dispatch(removeUser());
        }
        return Promise.reject(error);
      },
    );
  }, []);

  useEffect(() => {
    (async () => {
      try {
        // this api call is happening more then once
        const { data } = await pingToGetAuthenticatedUser();

        dispatch(addUser(data!));
      } catch (err) {
        console.log("🚀 ~ useEffect ~ err:", err);

        dispatch(removeUser());
      }
    })();
  }, []);

  return {};
}
