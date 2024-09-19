"use client";

import DispatchInformationHeader from "@/components/DispatchInformationHeader";
import OrderDashBoard from "@/components/OrderDashBoard";
import NaverMap from "@/components/NaverMap";
import useOnlyClient from "@/hooks/useOnlyClient";
import { useRecoilState } from "recoil";
import { dispatchDataState } from "@/atoms/dispatchData";
import { useRouter } from "next/navigation";
// import ConfirmModal from "@/components/ConfirmModal";

const Page = () => {
  const [dispatchData] = useRecoilState(dispatchDataState);
  // const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const isClient = useOnlyClient();

  if (!isClient) return null;

  if (!dispatchData) {
    router.push("/dispatch");
  }
  return (
    <div className="w-full">
      {/* {showModal && (
        <ConfirmModal
          title="배차방식 선택 후,"
          text={[{ type: "main", value: "주문 데이터를 먼저 업로드 해주세요." }]}
        />
      )} */}
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
