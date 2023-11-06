import { useState, useContext } from "react";
import axios from "axios";
import { GlobalContext } from "../../context/index";
import { getUrl } from "../../helpers";
import toast from "react-hot-toast";

export default function LoginForm() {
  const { state, dispatch } = useContext(GlobalContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // Handle login logic here (e.g., send data to server, perform validation, etc.)

    try {
      const { data } = await axios.post(
        `${getUrl()}/api/v1/login`,
        {
          email: formData.email,
          password: formData.password,
        },
        {
          withCredentials: true,
        },
      );
      console.log("🚀 ~ file: Login.tsx:38 ~ handleSubmit ~ res:", data);

      dispatch({
        type: "USER_LOGIN",
        payload: data?.data,
      });

      toast.success(data?.message || "Logged In Successfully!");
    } catch (err: any) {
      console.log("🚀 ~ file: Login.tsx:47 ~ handleSubmit ~ err:", err);
      toast.error(err?.response?.data?.message || "unknown error!");
    }
  };

  return (
    <div className="mx-auto w-[90%] rounded bg-white p-6 shadow-md md:w-[50%]">
      <h2 className="mb-4 text-center text-2xl font-bold">Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Email
          </label>
          <input
            required
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            Password
          </label>
          <input
            required
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="focus:shadow-outline w-full rounded border px-3 py-2 leading-tight text-gray-700 focus:outline-none"
          />
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
