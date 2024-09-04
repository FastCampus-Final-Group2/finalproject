"use server";

import { LogoutData } from "@/models/ApiTypes";
import axios from "@/utils/axios";
import { USERS_API_PATH } from "@/apis/path";
import toAxios from "@/utils/toAxios";

const logout = async () => {
  return toAxios<LogoutData>(axios.get<LogoutData>(USERS_API_PATH.logout));
};

export default logout;
