import Image from "next/image";

export default function Home() {
  return (
    <div className="flex">
      <div className="flex h-screen w-1/2 items-center justify-center bg-gray-900">
        <Image src={"/logo.png"} alt="GLT KOREA LOGO" width={436} height={80} />
      </div>
      <div className="flex h-screen w-1/2 items-center justify-center bg-blue-30"></div>
    </div>
  );
}
