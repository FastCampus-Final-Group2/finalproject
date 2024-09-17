"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // 페이지 이동을 위해 useRouter 훅 추가
import CopyButton from "@/components/core/CopyButton";
import Button from "@/components/core/Button";
import ConfirmModal from "@/components/ConfirmModal";
import dayjs from "dayjs";
import axios from "@/utils/axios";
import { useRecoilState } from "recoil";
import { dispatchDataState, pendingOrderDataState } from "@/atoms/dispatchData";

const DispatchInformationHeader = () => {
  const [recoilDispatchData, setRecoilDispatchData] = useRecoilState(dispatchDataState);
  const [, setPendingOrderData] = useRecoilState(pendingOrderDataState);

  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const router = useRouter(); // useRouter 훅을 사용해 페이지 이동 관리

  const formatDate = (dateString?: string) => {
    return dayjs(dateString).format("MM월 DD일 HH:mm");
  };

  const handleCancelDispatch = () => {
    setIsCancelModalOpen(true);
  };

  const handleConfirmDispatch = () => {
    setIsConfirmModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsCancelModalOpen(false);
    setIsConfirmModalOpen(false);
  };

  const handleCancelDispatchConfirm = () => {
    // 배차 취소 확인 시 동작
    console.log("배차 취소가 확인되었습니다.");
    setRecoilDispatchData(null);
    setPendingOrderData([]);
    setIsCancelModalOpen(false);
    router.push("/dispatch");
  };

  const handleConfirmDispatchConfirm = async () => {
    // 배차 확정 확인 시 서버로 데이터 전송
    const requestBodyDispatchData = {
      dispatchCode: recoilDispatchData?.dispatchCode,
      dispatchName: recoilDispatchData?.dispatchName,
      loadingStartTime: recoilDispatchData?.loadingStartTime,
      dispatchList: recoilDispatchData?.course?.map((course, courseIndex) => ({
        smId: course.smId,
        breakStartTime: course.breakStartTime,
        breakEndTime: course.breakEndTime,
        restingStopover: course.restingPosition,
        dispatchDetailList: course.courseDetailResponseList?.map((detail, detailIndex) => ({
          smName: detail.smName,
          ett: detail.ett,
          expectationOperationStartTime: detail.expectationOperationStartTime,
          expectationOperationEndTime: detail.expectationOperationEndTime,
          deliveryDestinationId: detail.deliveryDestinationId,
          phoneNumber: detail.contact, // 기본값 사용
          orderNumber: detail.clientOrderKey, // 기본값 사용
          orderDate: detail.receivedDate,
          lat: detail.lat,
          lon: detail.lon,
          distance: detail.distance,
          deliveryType: detail.deliveryType,
          shipmentNumber: detail.shipmentNumber,
          orderType: detail.orderType,
          serviceRequestDate: detail.serviceRequestDate,
          serviceRequestTime: detail.serviceRequestTime,
          clientName: detail.clientName,
          lotNumberAddress: detail.lotNumberAddress,
          roadAddress: detail.roadAddress,
          detailAddress: detail.detailAddress,
          zipcode: detail.zipcode,
          volume: detail.volume,
          weight: detail.weight,
          note: detail.note,
          expectedServiceDuration: detail.expectedServiceDuration,
          productName: detail.productName,
          productCode: detail.productCode,
          productQuantity: detail.productQuantity,
        })),
        coordinates: course.coordinatesResponseList?.map((coord) => ({
          lon: coord.lon,
          lat: coord.lat,
        })),
      })),
    };

    console.log(requestBodyDispatchData);

    try {
      const response = await axios.post("/dispatch", requestBodyDispatchData); // 서버로 데이터 전송
      console.log("응답 상태 코드:", response.status); // 응답 상태 코드 출력
      if (response.status === 200 || response.status === 201) {
        console.log("배차 확정이 성공적으로 처리되었습니다.");
        router.push("/control"); // 성공 시 /control 페이지로 이동
      }
    } catch (error) {
      console.error("배차 확정 중 오류가 발생했습니다.", error);
    } finally {
      setIsConfirmModalOpen(false); // 모달 닫기
      setRecoilDispatchData(null);
      setPendingOrderData([]);
    }
  };

  return (
    <div className="flex h-[92px] items-center justify-between border-b px-[40px] pb-[24px] pt-[28px]">
      <div className="flex h-[36px] w-[535px] items-center gap-5">
        <div className="flex h-[36px] w-[172px] items-center justify-center gap-[6px] text-[20px] font-B leading-[24px]">
          <span>{recoilDispatchData?.dispatchCode}</span>
          <CopyButton copyString={recoilDispatchData?.dispatchCode} />
        </div>
        <div className="flex h-[36px] w-[351px] gap-6">
          <div className="flex h-[36px] w-[174px] items-center justify-center leading-[24px] text-T-18-M">
            {recoilDispatchData?.dispatchName}
          </div>
          <div className="flex h-[36px] w-[116px] items-center justify-center rounded-[4px] bg-gray-100 leading-[24px] text-B-14-M">
            {formatDate(recoilDispatchData?.loadingStartTime)}
          </div>
          <div className="flex h-[36px] w-[41px] items-center justify-center rounded-[4px] bg-gray-700 leading-[24px] text-white text-B-14-B">
            {recoilDispatchData?.contractType}
          </div>
        </div>
      </div>
      <div className="flex h-[40px] gap-4">
        <Button size="s" intent="secondary" onClick={handleCancelDispatch}>
          배차 취소
        </Button>
        <Button size="s" onClick={handleConfirmDispatch}>
          배차 확정
        </Button>
      </div>

      {isCancelModalOpen && (
        <ConfirmModal
          title="배차를 취소 하시겠습니까?"
          text={[{ type: "alert", value: "배차취소 시, 상태는 복구되지 않습니다." }]}
          onClickClose={handleCloseModal}
          onConfirm={handleCancelDispatchConfirm}
          leftButtonText="돌아가기"
          rightButtonText="배차취소"
        />
      )}

      {isConfirmModalOpen && (
        <ConfirmModal
          title="배차확정"
          text={[
            { type: "sub", value: "배차를 확정하시겠습니까?" },
            { type: "main", value: "확정시, 기사님에게 운송이 요청됩니다." },
          ]}
          onClickClose={handleCloseModal}
          onConfirm={handleConfirmDispatchConfirm}
          leftButtonText="취소"
          rightButtonText="확인"
        />
      )}
    </div>
  );
};

export default DispatchInformationHeader;
