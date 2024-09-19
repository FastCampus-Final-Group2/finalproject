"use client";

import DispatchInformationHeader from "@/components/DispatchInformationHeader";
import OrderDashBoard from "@/components/OrderDashBoard";
import NaverMap from "@/components/NaverMap";
import useOnlyClient from "@/hooks/useOnlyClient";
import { useRecoilState } from "recoil";
import { dispatchDataState } from "@/atoms/dispatchData";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
// import ConfirmModal from "@/components/ConfirmModal";

const Page = () => {
  const [dispatchData] = useRecoilState(dispatchDataState);
  // const [showModal, setShowModal] = useState(false);
  const router = useRouter();
  const isClient = useOnlyClient();

  useEffect(() => {
    // dispatchData가 없으면 모달을 보여주고 3초 후에 리디렉션
    if (!dispatchData) {
      // setShowModal(true); // 모달 표시
      // const timer = setTimeout(() => {
      //   setShowModal(false); // 모달 숨기기
      //   router.push("/"); // 홈페이지로 리디렉션
      // }, 3000); // 3초 후 리디렉션
      router.push("/");
      // return () => clearTimeout(timer); // 컴포넌트 언마운트 시 타이머 해제
    }
  }, [dispatchData, router]);

  if (!isClient) return null;

  if (!dispatchData) {
    return null; // dispatchData가 없으면 null 반환
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
