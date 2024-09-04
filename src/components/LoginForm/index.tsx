"use client";

import Button from "@/components/core/Button";
import CheckBox from "@/components/core/CheckBox";
import { FormProvider, useForm } from "react-hook-form";
import type { SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { LOGIN_FORMS } from "./index.constants";
import LoginFormInput from "./LoginFormInput";
import { UsersAPI } from "@/apis/users";
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/user";
import localStorage from "@/service/localStorage";
import { useEffect } from "react";

const LoginForm = () => {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);

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
    resetField,
    setError,
  } = useFormMethods;

  const onSubmit: SubmitHandler<typeof initialState> = async (formData) => {
    const { save, ...loginRequest } = formData;

    if (save) {
      localStorage.username.set(loginRequest.username);
    }

    const [error, loginData] = await UsersAPI.login(loginRequest);

    if (loginData) {
      setUser(loginData.name);
      router.push("/dispatch");
    }

    if (error && error.type === "AXIOS_ERROR") {
      if (error.status === 404) {
        setError("username", {
          type: error.statusText,
          message: "아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해주세요.",
        });
        setError("password", {
          type: error.statusText,
          message: "아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해주세요.",
        });
      }
    }
  };

  const onError: SubmitErrorHandler<typeof initialState> = (errors) => {
    const ids = Object.keys(errors) as (keyof typeof initialState)[];
    ids.forEach((id) => {
      if (errors[id]) resetField(id, { keepError: true });
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
          {(errors.username?.type === "pattern" ||
            errors.username?.type === "Not Found" ||
            errors.password?.type === "pattern" ||
            errors.password?.type === "Not Found") && (
            <p className="text-center text-red-500 text-T-16-M">
              아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해주세요.
            </p>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
