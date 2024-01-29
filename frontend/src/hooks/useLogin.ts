// import axios from "axios";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
// import { getUrl } from "../helpers";
import {
  loginFormSchema,
  type loginFormSchemaType,
} from "../lib/zodValidation";
import { AppDispatch, RootState } from "../types";
import { login, reset } from "../store/auth/authSlice";

export default function useLoginHandler() {
  // const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(loginFormSchema),
  });

  const dispatch = useDispatch<AppDispatch>();

  const { isLoading, errorMessage, isSuccess } = useSelector(
    (state: RootState) => state.auth,
  );

  useEffect(() => {
    if (errorMessage) {
      toast.error(errorMessage || "unknown error!");
    }
    // dispatch(reset());
  }, [isSuccess, errorMessage]);

  const onFormSubmit = async (formValues: loginFormSchemaType) => {
    console.log("🚀 ~ onFormSubmit ~ formValues:", formValues);
    // setIsLoading(true);

    try {
      // const { data } = await axios.post(
      //   `${getUrl()}/api/v1/users/login`,
      //   formValues,
      // );
      dispatch(login(formValues));

      toast(errorMessage || "unknown error!");

      // toast.success(message || "Logged In Successfully!");
    } catch (err: any) {
      console.log("🚀 ~ file: Login.tsx:47 ~ handleSubmit ~ err:", err);

      toast.error(err?.response?.data?.message || "unknown error!");
    }
    // setIsLoading(false);
  };
  const onSubmit = handleSubmit(onFormSubmit);

  return { onSubmit, register, errors, isLoading };
}
