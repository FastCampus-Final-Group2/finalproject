import { LOGIN_FORMS } from "@/components/LoginForm/index.constants";
import { LoginRequest } from "@/models/ApiTypes";

export const loginRequestValid = (loginRequest: LoginRequest) => {
  return LOGIN_FORMS.every(({ id, pattern }) => {
    return pattern.every(({ regExp }) => {
      return RegExp(regExp).test(loginRequest[id]);
    });
  });
};
