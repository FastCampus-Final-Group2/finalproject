"use client";

import DispatchInformationHeader from "@/components/DispatchInformationHeader";
import OrderDashBoard from "@/components/OrderDashBoard";
import NaverMap from "@/components/NaverMap";
import useOnlyClient from "@/hooks/useOnlyClient";
import { useRecoilState, useRecoilValue } from "recoil";
import { dispatchDataState } from "@/atoms/dispatchData";
import { useRouter } from "next/navigation";
import { dispatchRouterState } from "@/atoms/dispatchRouter";

const Page = () => {
  const [dispatchData] = useRecoilState(dispatchDataState);
  const dispatchRouter = useRecoilValue(dispatchRouterState);
  const router = useRouter();
  const isClient = useOnlyClient();

  if (!isClient) return null;

  if (!dispatchData) {
    if (!dispatchRouter) {
      router.push("/dispatch");
    } else {
      router.push("/control");
    }
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
