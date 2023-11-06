import { Link } from "react-router-dom";
import LoginForm from "../components/auth/Login";
import SignupForm from "../components/auth/Signup";
// import ForgetPassword from "./components/forgetPasword";
// import ChangePassword from "./components/changePassword";

export default function AuthPage({ type }: { type: "login" | "signup" }) {
  return (
    <div>
      AuthPage {type}
      {type === "login" ? <LoginForm /> : <SignupForm />}
      <br />
      <br />
      <Link to={`/login`}>login</Link>
      <br />
      <Link to={`/sign-up`}>signup</Link>
    </div>
  );
}
