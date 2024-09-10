"use client";

import { orderListState } from "@/atoms/dipatchData";
import { excelDataState } from "@/atoms/excelData";
import DispatchSelector from "@/components/DispatchSelector";
import OrderValidation from "@/components/OrderValidation";
import useOnlyClient from "@/hooks/useOnlyClient";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

const Dispatch = () => {
  const isClient = useOnlyClient();

  const excelData = useRecoilValue(excelDataState);
  const orderList = useRecoilValue(orderListState);
  const router = useRouter();

  if (!isClient) return null;

  if (excelData.length !== 0) {
    return <OrderValidation />;
  } else if (orderList) {
    router.push("/dispatch/manual");
  } else {
    return <DispatchSelector />;
  }
};

export default Dispatch;
