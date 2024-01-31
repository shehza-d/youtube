import { IResponse, IUser } from "./../../types/index";
import axios from "axios";
import { getUrl } from "../../helpers";
import { loginFormSchemaType } from "../zodValidation";

// this file is for making http req and getting res
// add typings to all parameters and responses

// Login user
const login = async (userData: loginFormSchemaType) => {
  const { data } = await axios.post<IResponse<IUser>>(
    `${getUrl()}/api/v1/users/login`,
    userData,
  );
  console.log("🚀 ~ login ~ data:", data);

  return data;
};

// Logout user
const logout = async () => {
  const { data } = await axios.post<IResponse<null>>(
    `${getUrl()}/api/v1/users/logout`,
  );
  return data;
};

const pingToGetAuthenticatedUser = async () => {
  const { data } = await axios.get<IResponse<IUser>>(
    `${getUrl()}/api/v1/users/current-user`,
    {
      headers: {
        "Cache-Control": "no-cache",
        Pragma: "no-cache",
        Expires: "0",
      },
    },
  );

  return data;
};

export { logout, login, pingToGetAuthenticatedUser };
