import "./input.css";
// import { TFields } from "../../types";
// import { type loginFormSchemaType } from "../../lib/zodValidation";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

export default function Input({
  id,
  placeholder,
  type = "text",
  required = true,
  register,
  errors,
}: {
  id: string;
  placeholder?: string;
  type?: "text" | "number" | "email" | "password";
  required?: boolean;
  register: UseFormRegister<any>;
  errors: FieldErrors<any>;
}) {
  placeholder = placeholder || id;
  return (
    <div className="relative h-14 w-full">
      <input
        className={`input focus:ring-2 ${
          errors?.[id] ? "ring-red-500" : "focus:ring-primary"
        }`}
        id={id}
        type={type}
        placeholder=" "
        autoComplete="on"
        {...register(id, {
          // valueAsNumber: type === "number" ? true : false,
        })}
      />
      <div className="cut"></div>
      <label htmlFor={id} className="placeholder capitalize">
        {placeholder} {required ? "*" : "(optional)"}
      </label>

      {errors?.[id] && (
        <p className="mb-4 text-red-400">{`${errors?.[id]?.message}`}</p>
      )}
    </div>
  );
}
