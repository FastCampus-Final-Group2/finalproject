import Input from "@/components/core/Input";
import Button from "@/components/core/Button";

const LoginForm = () => {
  return (
    <div className="flex w-[404px] flex-col gap-5">
      <header className="flex flex-col gap-2">
        <h2 className="text-gray-900 text-H-28-B">배송관리시스템</h2>
        <span className="text-gray-700 text-T-20-M">GLT Korea TMS서비스에 오신 것을 환영합니다.</span>
      </header>
      <form className="flex flex-col gap-4">
        <Input placeholder="아이디를 입력해주세요." />
        <Input placeholder="비밀번호를 입력해주세요." />
        <Button className="h-[42px]">로그인</Button>
      </form>
    </div>
  );
};

export default LoginForm;
