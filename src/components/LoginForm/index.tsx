"use client";

import Input from "@/components/core/Input";
import Button from "@/components/core/Button";
import CheckBox from "@/components/core/CheckBox";
import { FormProvider, useForm } from "react-hook-form";
import type { FieldError, SubmitErrorHandler, SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { LOGIN_FORMS } from "./index.constants";
import LoginFormInput from "./LoginFormInput";

const LoginForm = () => {
  // TODO
  const initialState = {
    username: "",
    password: "",
  };

  const router = useRouter();
  const useFormMethods = useForm({ defaultValues: initialState });
  const {
    handleSubmit,
    formState: { errors },
    resetField,
  } = useFormMethods;

  const onSubmit: SubmitHandler<typeof initialState> = async (formData) => {
    // TODO
    console.log(formData);
    router.push("/dispatch");
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
          <CheckBox label="아이디 저장" initialState={false} />
          <Button className="h-[43px] p-3" type="submit">
            로그인
          </Button>
          {(errors.username?.type === "pattern" || errors.password?.type === "pattern") && (
            <p className="text-center text-red-500 text-T-16-M">
              {errors.username?.message || errors.password?.message}
            </p>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default LoginForm;
