import toast from "react-hot-toast";
import { logout } from "../../lib/api";
import { removeUser } from "../../store/auth/authSlice";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../types";

export default function useLogout() {
  const dispatch = useDispatch<AppDispatch>();

  const logoutHandler = async () => {
    try {
      const res = await logout();

      dispatch(removeUser());

      toast.success(res?.message || "Logout successfully!");

      //
    } catch (err: any) {
      console.log("err in logout: ", err);

      toast.error(err?.message || "Unknown error!");
    }
  };

  return { logoutHandler };
}
