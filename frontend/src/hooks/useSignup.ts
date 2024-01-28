import { useState } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signupFormSchema,
  type signupFormSchemaType,
} from "../lib/zodValidation";
import { constructFormData, getUrl } from "../helpers";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function useSignup() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, formState } =
    useForm<signupFormSchemaType>({
      mode: "onTouched",
      resolver: zodResolver(signupFormSchema),
    });
  const { errors } = formState;

  const onFormSubmit: SubmitHandler<signupFormSchemaType> = async (
    formValues: signupFormSchemaType,
  ) => {
    //
    setIsLoading(true);

    const formData = constructFormData({
      ...formValues,
      avatar: formValues?.avatar?.[0],
      coverImage: formValues?.coverImage?.[0],
    });

    try {
      const { data } = await axios.post(
        `${getUrl()}/api/v1/users/register`,
        formData,
        {
          withCredentials: true, // try removing
          headers: { "Content-Type": "multipart/form-data" },
        },
      );

      navigate("/login");

      toast.success(data?.message || "User created successfully!");
      //
    } catch (err: any) {
      console.log("🚀 ~ file: Login.tsx:47 ~ handleSubmit ~ err:", err);

      toast.error(err?.response?.data?.message || "unknown error!");
    }
    setIsLoading(false);
  };

  const onSubmit = handleSubmit(onFormSubmit);

  return { onSubmit, register, errors, isLoading };
}
