import { Routes, Route, Navigate } from "react-router-dom";
import { AuthPage } from "../pages";
import { useSelector } from "react-redux";
import { RootState } from "../types";
import Loading from "../components/ui/LoadingPage";

export default function AppRouter() {
  const { isUserLoggedIn } = useSelector((state: RootState) => state.auth);

  console.log("🚀 ~ AppRouter ~ isUserLoggedIn:", isUserLoggedIn);

  // initial state to show loading at first glance
  if (isUserLoggedIn === null) return <Loading />;

  return (
    <>
      <Routes>
        {/* Common routes */}

        <Route path="/" element={<>Home page where videos will be shown</>} />
        <Route path="/not-found" element={<>404 Page not found</>} />
        <Route path="/search" element={<>Video Listing Page (List View)</>} />
        <Route path="/c/:userName" element={<>Channel Video List Page</>} />
        <Route
          path="/c/:userName/playlist"
          element={<>Channel Playlist Page</>}
        />
        <Route path="/c/:userName/tweets" element={<>Channel Tweets Page</>} />
        <Route
          path="/playlist/:id"
          element={<>Channel Playlist Videos Page</>}
        />
        <Route
          path="/terms-and-conditions"
          element={<>Terms and Conditions Page</>}
        />
        <Route path="/privacy-policy" element={<>Privacy Policy Page</>} />

        {/* authenticated/secure routes */}
        {isUserLoggedIn && (
          <>
            <Route
              path="/"
              element={<h1 className="text-red-600">Hello Dashboard</h1>}
            />
            <Route path="/video/:id" element={<>Video Detail Page</>} />
            <Route path="/dashboard" element={<>Admin Dashboard Page</>} />
            <Route
              path="/c/:userName/subscribed"
              element={<>Channel Subscribed Page</>}
            />
            <Route path="/setting" element={<>Edit Personal Info Page</>} />

            {/* privacy-policy is in protected routes for testing purpose */}

            {/* <Route path="/change-password" element={<ChangePassword />} /> */}
            <Route
              path="*"
              element={<Navigate to="/not-found" replace={true} />}
            />
          </>
        )}

        {/* unauthenticated(not secure) routes */}
        {isUserLoggedIn === false && (
          <>
            <Route path="/login" element={<AuthPage type="login" />} />
            <Route path="/sign-up" element={<AuthPage type="signup" />} />

            {/* <Route path="/forget-password" element={<ForgetPassword />} /> */}
            <Route path="*" element={<Navigate to="/login" replace={true} />} />
          </>
        )}
      </Routes>
    </>
  );
}
