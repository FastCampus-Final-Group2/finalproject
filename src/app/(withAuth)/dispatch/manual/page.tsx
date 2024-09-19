"use client";

import DispatchInformationHeader from "@/components/DispatchInformationHeader";
import OrderDashBoard from "@/components/OrderDashBoard";
import NaverMap from "@/components/NaverMap";
import useOnlyClient from "@/hooks/useOnlyClient";
import { useRecoilState } from "recoil";
import { dispatchDataState } from "@/atoms/dispatchData";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Spinner from "@/components/core/Spinner";

const Page = () => {
  const [dispatchData] = useRecoilState(dispatchDataState);
  const router = useRouter();
  const isClient = useOnlyClient();

  useEffect(() => {
    if (!dispatchData) {
      router.push("/dispatch");
    }
  }, [dispatchData, router]);

  if (!isClient || !dispatchData) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full">
      <DispatchInformationHeader />
      <div className="flex w-full">
        <OrderDashBoard />
        <div className="w-full">
          <NaverMap />
        </div>
      </div>
    </div>
  );
};

export default Page;
