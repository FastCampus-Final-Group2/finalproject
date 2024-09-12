"use client";

import Button from "@/components/core/Button";
import CheckBox from "@/components/core/CheckBox";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LOGIN_ERROR_MESSAGE, LOGIN_FORMS } from "./index.constants";
import LoginFormInput from "./LoginFormInput";
import { UsersAPI } from "@/apis/users";
import { useRecoilState, useResetRecoilState } from "recoil";
import { userState } from "@/atoms/user";
import localStorage from "@/service/localStorage";
import { useEffect, useState } from "react";
import { useTabStateContext } from "@/contexts/TabStateContext";
import useResetExcelDataAtoms from "@/hooks/useResetExcelDataAtoms";
import { dispatchDataState } from "@/atoms/dispatchData";
import { loginRequestValid } from "@/utils/validation/login";

const LoginForm = () => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const resetExcelDataAtoms = useResetExcelDataAtoms();
  const resetDispatchData = useResetRecoilState(dispatchDataState);
  const { resetTabState } = useTabStateContext();

  useEffect(() => {
    if (user) {
      router.push("/dispatch");
    }
  }, [user, router]);

  const localUsername = localStorage.username.get();
  const initialState = {
    username: localUsername || "",
    password: "",
    save: localUsername !== "",
  };

  const useFormMethods = useForm({ defaultValues: initialState });
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
    setError,
  } = useFormMethods;

  const onSubmit: SubmitHandler<typeof initialState> = async (formData) => {
    const { save, ...loginRequest } = formData;

    if (!loginRequestValid(loginRequest)) {
      setErrorMessage(LOGIN_ERROR_MESSAGE);
      setError("username", { message: LOGIN_ERROR_MESSAGE });
      setError("password", { message: LOGIN_ERROR_MESSAGE });
      return;
    }

    if (save) {
      localStorage.username.set(loginRequest.username);
    } else {
      localStorage.username.remove();
    }

    const [error, loginData] = await UsersAPI.login(loginRequest);

    if (loginData) {
      resetExcelDataAtoms();
      resetDispatchData();
      resetTabState();
      setUser(loginData.name);
      router.push("/dispatch");
    }

    if (error) {
      setErrorMessage(LOGIN_ERROR_MESSAGE);
    }
  };

  const onError: SubmitErrorHandler<typeof initialState> = (errors) => {
    const ids = Object.keys(errors) as (keyof typeof initialState)[];
    ids.forEach((id) => {
      if (errors[id]) setValue(id, "");
    });
  };

  return (
    <div className="flex w-[404px] flex-col gap-5">
      <header className="flex flex-col gap-2">
        <h2 className="text-gray-900 text-H-28-B">배송관리시스템</h2>
        <span className="text-gray-700 text-T-20-M">GLT Korea TMS서비스에 오신 것을 환영합니다.</span>
      </header>
      <FormProvider {...useFormMethods}>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit, onError)}>
          {LOGIN_FORMS.map((form) => {
            return <LoginFormInput key={form.id} form={form} error={errors[form.id]} />;
          })}
          <CheckBox label="아이디 저장" initialState={localUsername !== ""} {...register("save")} />
          <Button className="h-[43px] p-3" type="submit">
            로그인
          </Button>
          {errorMessage && <p className="text-center text-red-500 text-T-16-M">{errorMessage}</p>}
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
