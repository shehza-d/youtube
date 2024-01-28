// import Navbar from "./components/ui/NavBar";
import AppRouter from "./routes/AppRouter";
import { Toaster } from "react-hot-toast"; // https://react-hot-toast.com/docs

export default function App() {
  return (
    <main className="bg-slate-200 dark:bg-[#121212]">
      <AppRouter />
      <Toaster /> {/* Toaster is being used for notifications */}
    </main>
  );
}
