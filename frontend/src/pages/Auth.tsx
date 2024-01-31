import { Link } from "react-router-dom";
import { LoginForm, SignupForm } from "../components/auth";
import Logo from "../assets/icons/logo";

export default function AuthPage({ type }: { type: "login" | "signup" }) {
  return (
    <div className="flex min-h-screen flex-col items-center overflow-y-auto text-white">
      <div className="mt-10 inline-block w-16">
        <Logo />
      </div>
      <h2 className="mb-6 w-full text-center text-2xl font-semibold uppercase">
        Play
      </h2>

      <div className="mb-14 flex w-80 rounded-lg bg-gray-700 p-2">
        <Link
          to={`/login`}
          className={`center ${
            type === "login" ? "bg-gray-500" : "bg-transparent"
          } h-10 w-full rounded text-white`}
        >
          Login
        </Link>
        <Link
          to={`/sign-up`}
          className={`center ${
            type === "signup" ? "bg-gray-500" : "bg-transparent"
          } h-10 w-full rounded text-white`}
        >
          Signup
        </Link>
      </div>

      <div className="mb-24 w-[90%] md:w-[50%]">
        {type === "login" ? <LoginForm /> : <SignupForm />}
      </div>
    </div>
  );
}
