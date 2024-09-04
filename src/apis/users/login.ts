"use server";

import { LoginData, LoginRequest } from "@/models/ApiTypes";
import axios from "@/utils/axios";
import { USERS_API_PATH } from "@/apis/path";
import toAxios from "@/utils/toAxios";

const login = async (loginRequest: LoginRequest) => {
  return toAxios<LoginData>(axios.post(USERS_API_PATH.login, loginRequest));
};

export default login;
