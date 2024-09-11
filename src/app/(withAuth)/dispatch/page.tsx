"use client";

import { dispatchDataState } from "@/atoms/dispatchData";
import { excelDataState } from "@/atoms/excelData";
import Spinner from "@/components/core/Spinner";
import DispatchSelector from "@/components/DispatchSelector";
import OrderValidation from "@/components/OrderValidation";
import useOnlyClient from "@/hooks/useOnlyClient";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";

const Dispatch = () => {
  const isClient = useOnlyClient();

  const excelData = useRecoilValue(excelDataState);
  const dispatchData = useRecoilValue(dispatchDataState);
  const router = useRouter();

  useEffect(() => {
    if (dispatchData) {
      router.push("/dispatch/manual");
    }
  }, [dispatchData, router]);

  if (!isClient) return null;

  if (excelData.length !== 0) {
    return <OrderValidation />;
  } else if (dispatchData) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  } else {
    return <DispatchSelector />;
  }
};

export default Dispatch;
