// this file is for making http req and getting res

import axios from "axios";
import { getUrl } from "../../helpers";

// register user
const register = async (userData: any) => {
  const { data } = await axios.post(
    `${getUrl()}/api/v1/users/register`,
    userData,
  );

  return data;
};

const authService = {
  register,
};

export { authService };
