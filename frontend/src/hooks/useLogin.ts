import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginFormSchema,
  type loginFormSchemaType,
} from "../lib/zodValidation";
import { getUrl } from "../helpers";
import toast from "react-hot-toast";

export default function useLoginHandler() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<loginFormSchemaType>({
    mode: "onTouched",
    resolver: zodResolver(loginFormSchema),
  });

  const onFormSubmit = async (data: loginFormSchemaType) => {
    // e.preventDefault();
    console.log("🚀 ~ onFormSubmit ~ data:", data);
    // Handle login logic here (e.g., send data to server, perform validation, etc.)

    try {
      const res = await fetch(`${getUrl()}/api/v1/users/login`, {
        method: "POST",
        // email: formData.email,
        // password: formData.password,
        credentials: "include",
      });
      const data = (await res.json()) as any;
      console.log(
        "🚀 jjjjjjjjjjjjjjjjjjjjjj~ file: Login.tsx:38 ~ handleSubmit ~ res:",
        data,
      );

      // dispatch({
      //   type: "USER_LOGIN",
      //   payload: data,
      // });

      toast.success(data?.message || "Logged In Successfully!");
    } catch (err: any) {
      console.log("🚀 ~ file: Login.tsx:47 ~ handleSubmit ~ err:", err);
      toast.error(err?.response?.data?.message || "unknown error!");
    }
  };

  return { handleSubmit, register, errors, onFormSubmit };
}
