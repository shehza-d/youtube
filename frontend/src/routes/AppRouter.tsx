import { useContext, useState } from "react";
import { GlobalContext } from "../context";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthPage, DoctorList, BookProfile, UserProfile } from "../pages";
// import axios from "axios";
import NavBar from "../components/ui/NavBar";
import useCheckLoginStatus from "../hooks/useCheckLoginStatus";

export default function AppRouter() {
  const { state, dispatch } = useContext(GlobalContext);

  useCheckLoginStatus();
  // const [state, setTesting] = useState<any>({ isLogin: false });
  const { isLogin } = state;

  console.log("🚀 ~ file: AppRouter.tsx:12 ~ AppRouter ~ isLogin:", isLogin);
  // let isLogin = true;
  // console.log("state", state);
  // setTimeout(() => {
  //   setTesting({ isLogin: false });
  // }, 3000);

  return (
    <>
      {/* initial state to show loading at first glance */}
      {isLogin === null && (
        <div className="flex min-h-screen items-center justify-center">
          Loading...
        </div>
      )}

      {isLogin && <NavBar />}

      {/* authenticated(secure) routes */}
      {isLogin && (
        <Routes>
          <Route path="/" element={<DoctorList />} />
          <Route path="/profiles" element={<UserProfile />} />
          <Route path="/profile/:id" element={<BookProfile />} />
          {/* <Route path="/change-password" element={<ChangePassword />} /> */}
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      )}

      {/* unauthenticated(not secure) routes */}
      {isLogin === false && (
        <Routes>
          <Route path="/login" element={<AuthPage type="login" />} />
          <Route path="/sign-up" element={<AuthPage type="signup" />} />
          {/* <Route path="/forget-password" element={<ForgetPassword />} /> */}
          <Route path="*" element={<Navigate to="/login" replace={true} />} />
        </Routes>
      )}
    </>
  );
}
