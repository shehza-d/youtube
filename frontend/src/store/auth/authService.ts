// this file is for making http req and getting res

import axios from "axios";
import { getUrl } from "../../helpers";

// Login user
const login = async (userData: any) => {
  console.log("🚀 ~ login ~ userData:", userData);

  const { data } = await axios.post(`${getUrl()}/api/v1/users/login`, userData);
  console.log("🚀 ~ login ~ data:", data);

  return data.data;
};

// Logout user
const logout = async () => {
  await axios.post(`${getUrl()}/api/v1/users/logout`);
};

const ping = async () => {
  const { data } = await axios.get(`${getUrl()}/api/v1/users/current-user`, {
    withCredentials: true,
    headers: {
      "Cache-Control": "no-cache",
      Pragma: "no-cache",
      Expires: "0",
    },
  });
  console.log("🚀 ~ const{data}=awaitaxios.get ~ data:", data);

  return data.data;
};

const authService = { logout, login, ping };

export { authService };
