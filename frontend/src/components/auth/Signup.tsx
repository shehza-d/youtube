import useSignup from "../../hooks/auth/useSignup";
import Input from "../ui/Input";
import Button from "../ui/Button";

export default function SignupForm() {
  const { onSubmit, register, errors, isLoading } = useSignup();

  return (
    <div className="flex w-full flex-col gap-9">
      <h3 className="mb-4 text-center text-2xl font-bold">Sign Up</h3>
      <p className="text-center">Let's create your account!</p>

      <form onSubmit={onSubmit} className="flex flex-col gap-12" noValidate>
        <Input
          id="fullName"
          placeholder="Full Name"
          register={register}
          errors={errors}
        />
        <Input id="userName" register={register} errors={errors} />
        <Input id="email" type="email" register={register} errors={errors} />
        <Input
          id="password"
          type="password"
          register={register}
          errors={errors}
        />
        <Input
          id="repeatPassword"
          type="password"
          register={register}
          errors={errors}
        />
        <input
          {...register("avatar", { required: "Profile picture is required" })}
          type="file"
          accept="image/*"
          id="avatar"
        />
        <input
          {...register("coverImage")}
          type="file"
          accept="image/*"
          id="coverImage"
        />
        <Button type="submit" loading={isLoading}>
          Sign in with Email
        </Button>
      </form>
    </div>
  );
}
