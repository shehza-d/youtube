// import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";
// import { getUrl } from "../helpers";
import {
  loginFormSchema,
  type loginFormSchemaType,
} from "../../lib/zodValidation";
import { AppDispatch } from "../../types";
// import {  reset } from "../store/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { login } from "../../lib/api";
import { addUser } from "../../store/auth/authSlice";

export default function useLogin() {
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();

  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginFormSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(loginFormSchema),
  });

  const onFormSubmit = async (formValues: loginFormSchemaType) => {
    try {
      setIsLoading(true);
      console.log("🚀 ~ onFormSubmit ~ formValues:", formValues);

      // username/email logic remove

      const res = await login(formValues);

      dispatch(addUser(res.data!));

      navigate(-1); // not working remove

      toast.success(res.message || "Logged In Successfully!");
    } catch (err: any) {
      console.log("🚀 ~ file: Login.tsx:47 ~ handleSubmit ~ err:", err);

      toast.error(err?.response?.data?.message || "unknown error!");
    }
    setIsLoading(false);
  };
  const onSubmit = handleSubmit(onFormSubmit);

  return { onSubmit, register, errors, isLoading };
}
