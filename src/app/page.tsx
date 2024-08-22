import LoginForm from "@/components/LoginForm";
import Image from "next/image";

const Home = () => {
  return (
    <div className="flex">
      <div className="flex h-screen w-1/2 items-center justify-center bg-gray-900">
        <Image src={"/logo.png"} alt="GLT KOREA LOGO" width={436} height={80} />
      </div>
      <div className="flex h-screen w-1/2 items-center justify-center bg-blue-30">
        <LoginForm />
      </div>
    </div>
  );
};

export default Home;
