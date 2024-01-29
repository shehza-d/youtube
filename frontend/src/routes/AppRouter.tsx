// import { useState, useEffect } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";
import { AuthPage, BookProfile, UserProfile } from "../pages";
import NavBar from "../components/ui/NavBar";
import useCheckLoginStatus from "../hooks/useCheckLoginStatus";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../types";
import Loading from "../components/ui/LoadingPage";

export default function AppRouter() {
  useCheckLoginStatus();

  const { isUserLoggedIn } = useSelector((state: RootState) => state.auth);

  // let isUserLoggedIn = null;

  return (
    <>
      {/* initial state to show loading at first glance */}
      {isUserLoggedIn === null && <Loading />}

      {isUserLoggedIn && <NavBar />}

      {/* authenticated/secure routes */}
      {isUserLoggedIn && (
        <Routes>
          <Route
            path="/"
            element={<h1 className="text-red-600">Hello Dashboard</h1>}
          />
          <Route path="/profiles" element={<UserProfile />} />
          <Route path="/profile/:id" element={<BookProfile />} />
          {/* <Route path="/change-password" element={<ChangePassword />} /> */}
          <Route path="*" element={<Navigate to="/" replace={true} />} />
        </Routes>
      )}

      {/* unauthenticated(not secure) routes */}
      {isUserLoggedIn === false && (
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
