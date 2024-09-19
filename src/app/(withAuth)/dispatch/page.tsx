"use client";

import { dispatchDataState } from "@/atoms/dispatchData";
import { dispatchRouterState } from "@/atoms/dispatchRouter";
import { excelDataState } from "@/atoms/excelData";
import Spinner from "@/components/core/Spinner";
import DispatchSelector from "@/components/DispatchSelector";
import OrderValidation from "@/components/OrderValidation";
import useOnlyClient from "@/hooks/useOnlyClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

const Dispatch = () => {
  const isClient = useOnlyClient();

  const excelData = useRecoilValue(excelDataState);
  const dispatchData = useRecoilValue(dispatchDataState);

  const [dispatchRouter, setDispatchRouter] = useRecoilState(dispatchRouterState);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (dispatchRouter) {
      setLoading(true);
      setDispatchRouter(false);
      router.push("/control");
    }
  }, [dispatchRouter, router, setDispatchRouter]);

  useEffect(() => {
    if (dispatchData) {
      router.push("/dispatch/manual");
    }
  }, [dispatchData, router]);

  if (!isClient || loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Spinner />
      </div>
    );
  }

  if (excelData.length !== 0) {
    return <OrderValidation />;
  } else if (dispatchData || dispatchRouter) {
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
