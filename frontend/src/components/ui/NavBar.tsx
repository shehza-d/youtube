import { Link } from "react-router-dom";
import { FiMenu as MenuIcon } from "react-icons/fi";
import { RxCross1 as CrossIcon } from "react-icons/rx";
import { useState } from "react";
import Logo from "../../assets/icons/logo";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "../../types";
import { FiSearch } from "react-icons/fi";
import { ImCross } from "react-icons/im";
import { AiOutlineLike } from "react-icons/ai";
import { IoVideocam } from "react-icons/io5";
import { FaRegQuestionCircle } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { logout } from "../../store/auth/authSlice";

const navLinks = [
  { title: "home", liLinecapnk: "/", id: 1 },
  { title: "logout", link: "/logout", id: 2 },
  //   { title: "men", link: "/products/men", id: 3 },
];

//   const logoutHandler = async () => {
//     try {
//       const response = await axios.post(
//         `${getUrl()}/logout`,
//         {},
//         { withCredentials: true },
//       );
//       console.log("response: ", response);
//       toast.success("Here is your toast.");

//       dispatch({ type: "USER_LOGOUT" });
//     } catch (error) {
//       console.log("axios error: ", error);
//       toast.error("err");
//     }
//   };

// }

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();

  const { user } = useSelector((state: RootState) => state.auth);

  console.log("🚀 ~ user:", user);

  const isLogin = !!user;

  const [open, setOpen] = useState(false); // this open refers to dropdown menu of mobile
  const [showNavbar, setShowNavbar] = useState(false);
  const pathname = "home";

  // useEffect(() => { //   if (pathname !== "/") { //     setShowNavbar(true);

  const sideNavbarLinks = [
    { name: "Liked Videos", icons: AiOutlineLike },
    { name: "my content", icons: IoVideocam },
    { name: "Support", icons: FaRegQuestionCircle },
    { name: "settings", icons: IoSettings },
  ];

  const navColor =
    "bg-[#605f5f] text-white border-white bgpurple-500/75 backdropblur-md";

  return (
    <header
      className={`${navColor} sticky inset-x-0 top-0 z-50 w-full border-b px-4`}
    >
      <nav className="mx-auto flex max-w-7xl items-center py-2">
        <div className="mr-4 w-12 shrink-0 sm:w-16">
          <Logo />
        </div>
        <div className="relative mx-auto hidden w-full max-w-md overflow-hidden sm:block">
          <input
            className="w-full border bg-transparent py-1 pl-8 pr-3 placeholder-white outline-none sm:py-2"
            placeholder="Search"
          />
          <span className="absolute left-2.5 top-1/2 inline-block -translate-y-1/2">
            <FiSearch />
          </span>
        </div>
        <button className="ml-auto sm:hidden">
          {/* user profile image */}
        </button>
        <button className="group peer ml-4 flex w-6 shrink-0 flex-wrap gap-y-1.5 sm:hidden">
          <span className="block h-[2px] w-full bg-white group-hover:bg-primary"></span>
          <span className="block h-[2px] w-2/3 bg-white group-hover:bg-primary"></span>
          <span className="block h-[2px] w-full bg-white group-hover:bg-primary"></span>
        </button>
        {/* Side navbar in small screen */}
        <div
          className={`${navColor} fixed inset-y-0 right-0 flex w-full max-w-xs shrink-0 translate-x-full flex-col border-l duration-200 hover:translate-x-0 peer-focus:translate-x-0 sm:static sm:ml-4 sm:w-auto sm:translate-x-0 sm:border-none`}
        >
          <div className="relative flex w-full items-center justify-between border-b border-white px-4 py-2 sm:hidden">
            <span className="inline-block w-12">
              <Logo />
            </span>
            {/* <button className="group peer inline-block w-8">
              <ImCross />
            </button> */}
          </div>
          <ul className="my-4 flex w-full flex-wrap gap-2 px-4 sm:hidden">
            {sideNavbarLinks.map((item, i) => (
              <li className="w-full" key={i}>
                <button className="flex w-full items-center justify-start gap-x-4 border border-white px-4 py-1.5 text-left hover:bg-primary hover:text-black focus:border-primary focus:bg-primary focus:text-black">
                  <span className="inline-block group-hover:mr-4 lg:mr-4">
                    <item.icons className="h-6 w-8" />
                  </span>
                  <span className="capitalize">{item.name}</span>
                </button>
              </li>
            ))}
          </ul>
          <div className="mb-8 mt-auto flex w-full flex-wrap gap-4 px-4 sm:mb-0 sm:mt-0 sm:items-center sm:px-0">
            {!isLogin ? (
              <>
                <button className="w-full bg-[#383737] px-3 py-2 hover:bg-[#4f4e4e] sm:w-auto sm:bg-transparent">
                  Log in
                </button>
                <button className="mr-1 w-full bg-primary px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto">
                  Sign up
                </button>
              </>
            ) : (
              <>
                <button className="flex w-full gap-4 text-left sm:w-fit sm:items-center">
                  <img
                    // src="https://images.pexels.com/photos/1115816/pexels-photo-1115816.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                    src={user.avatar}
                    alt="user profile"
                    className="h-16 w-16 shrink-0 rounded-full sm:h-12 sm:w-12"
                  />
                  <div className="w-full pt-2 sm:hidden">
                    <h6 className="font-semibold">{user.fullName}</h6>
                    <p className="text-sm text-gray-300">@{user.userName}</p>
                  </div>
                </button>
                <button
                  onClick={() => {
                    dispatch(logout());
                  }}
                  className="mr-1 w-full bg-primary px-3 py-2 text-center font-bold text-black shadow-[5px_5px_0px_0px_#4f4e4e] transition-all duration-150 ease-in-out active:translate-x-[5px] active:translate-y-[5px] active:shadow-[0px_0px_0px_0px_#4f4e4e] sm:w-auto"
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
