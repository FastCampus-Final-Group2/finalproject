"use client";

import Input from "@/components/core/Input";
import Button from "@/components/core/Button";
import CheckBox from "@/components/core/CheckBox";
import { useForm } from "react-hook-form";
import type { SubmitHandler } from "react-hook-form";
import { useCallback } from "react";
import { useRouter } from "next/navigation";

const LOGIN_FORMS = [
  {
    id: "username",
    placeholder: "아이디를 입력해주세요.",
    required: "아이디를 입력하세요.",
    pattern: {
      value: /[0-9]+/,
      message: "아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해주세요.",
    },
  },
  {
    id: "password",
    placeholder: "비밀번호를 입력해주세요.",
    required: "비밀번호를 입력하세요.",
    pattern: {
      value: /^(?:(?=.*[a-zA-Z])(?=.*\d|.*[!@#$%^&_+\[\]{}:,.<>?])|(?=.*\d)(?=.*[!@#$%^&_+\[\]{}:,.<>?])).{8,}$/,
      message: "아이디 또는 비밀번호가 맞지 않습니다. 다시 확인해주세요.",
    },
  },
] as const;
// 특수문자 !@#$%^&_+[]{}:,.<>?
const LoginForm = () => {
  // TODO
  const initialState = {
    username: "",
    password: "",
  };

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ defaultValues: initialState });

  const onSubmit: SubmitHandler<typeof initialState> = async (formData) => {
    // TODO
    console.log(formData);
    router.push("/dispatch");
  };

  const createInputComponent = useCallback(
    (form: (typeof LOGIN_FORMS)[number], errorMessage?: string) => {
      return (
        <Input
          key={form.id}
          placeholder={errorMessage ? errorMessage : form.placeholder}
          {...register(form.id, {
            required: form.required,
            pattern: form.pattern,
          })}
        />
      );
    },
    [register],
  );

  return (
    <div className="flex w-[404px] flex-col gap-5">
      <header className="flex flex-col gap-2">
        <h2 className="text-gray-900 text-H-28-B">배송관리시스템</h2>
        <span className="text-gray-700 text-T-20-M">GLT Korea TMS서비스에 오신 것을 환영합니다.</span>
      </header>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
        {LOGIN_FORMS.map((form) => {
          return createInputComponent(form, errors[form.id]?.message);
        })}
        <CheckBox label="아이디 저장" initialState={false} />
        <Button className="h-[42px]" type="submit">
          로그인
        </Button>
      </form>
    </div>
  );
};

export default LoginForm;
