"use client";

import { excelDataState } from "@/atoms/excelData";
import { orderListState } from "@/atoms/orederList";
import DispatchSelector from "@/components/DispatchSelector";
import OrderValidation from "@/components/OrderValidation";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";

const Dispatch = () => {
  const excelData = useRecoilValue(excelDataState);
  const orderList = useRecoilValue(orderListState);
  const router = useRouter();

  if (excelData.length !== 0) {
    return <OrderValidation />;
  } else if (orderList.length !== 0) {
    router.push("/dispatch/manual");
  } else {
    return <DispatchSelector />;
  }
};

export default Dispatch;
