import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs
import useCheckLoginStatus from "./hooks/auth/useCheckLoginStatus";
import Navbar from "./components/ui/NavBar";

export default function App() {
  useCheckLoginStatus(); // ping to server to check token and show pages according to user log status

  return (
    <main className="bg-slate-200 dark:bg-[#121212] dark:text-white">
      <Navbar />
      <AppRouter />
      <Toaster /> {/* Toaster is being used for notifications */}
    </main>
  );
}
