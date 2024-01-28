import Input from "../ui/Input";
import useLogin from "../../hooks/useLogin";
import Button from "../ui/Button";

export default function LoginForm() {
  const appName = "Youtube clone by Shehzad"; // replace with global app name
  const { register, errors, handleSubmit, onFormSubmit } = useLogin();

  return (
    <div className="flex w-full flex-col gap-9">
      <h3 className="mb-4 text-center text-2xl font-bold">Login</h3>
      <p className="text-center">Welcome back to {appName}!</p>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-12"
      >
        <Input id="email" type="email" register={register} errors={errors} />

        <Input id="password" register={register} errors={errors} />

        <Button type="submit">Login</Button>
      </form>
    </div>
  );
}
