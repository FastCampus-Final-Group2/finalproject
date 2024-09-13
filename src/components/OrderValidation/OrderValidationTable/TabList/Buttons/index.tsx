"use client";

import { TransportAPI } from "@/apis/transportOrder";
import { dispatchDataState } from "@/atoms/dispatchData";
import { dispatchNameState, excelDataState, isValidExcelDataState, loadingStartTimeState } from "@/atoms/excelData";
import ConfirmModal from "@/components/ConfirmModal";
import Button from "@/components/core/Button";
import LoadingModal from "@/components/LoadingModal";
import useResetExcelDataAtoms from "@/hooks/useResetExcelDataAtoms";
import { formatTransportOrderRequest } from "@/utils/format/transportOrder";
import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const Buttons = () => {
  const [loadingModalOpen, setLoadingModalOpen] = useState(false);
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const resetExcelDataAtoms = useResetExcelDataAtoms();

  const loadingStartTime = useRecoilValue(loadingStartTimeState);
  const dispatchName = useRecoilValue(dispatchNameState);
  const excelData = useRecoilValue(excelDataState);
  const isValidExcelData = useRecoilValue(isValidExcelDataState);

  const setDispatch = useSetRecoilState(dispatchDataState);

  const handleClickCancelBtn = () => {
    setCancelModalOpen(true);
  };

  const handleClickDispatchBtn = () => {
    setLoadingModalOpen(true);
  };

  const calculateDispatch = async () => {
    const transportOrderRequest = formatTransportOrderRequest(loadingStartTime, dispatchName, excelData);

    const [error, data] = await TransportAPI.postOrder(transportOrderRequest);

    if (error) {
      setLoadingModalOpen(false);
      return;
    }

    setTimeout(() => {
      setDispatch(data);
      resetExcelDataAtoms();
    }, 1000);
  };

  return (
    <div className="flex gap-4 px-2">
      <Button size="s" intent="secondary" type="button" onClick={handleClickCancelBtn}>
        업로드 취소
      </Button>
      <Button
        type="button"
        size="s"
        disabled={!(loadingStartTime !== "YYYY-MM-DD --:--" && isValidExcelData)}
        onClick={handleClickDispatchBtn}
      >
        배차 진행
      </Button>
      {cancelModalOpen && (
        <ConfirmModal
          title="주문업로드를 취소하시겠습니까?"
          text={[{ type: "alert", value: "취소 시, 업로드 된 주문 목록이 사라집니다." }]}
          onClickClose={() => {
            setCancelModalOpen(false);
          }}
          onConfirm={() => {
            resetExcelDataAtoms();
          }}
          leftButtonText="돌아가기"
          rightButtonText="업로드 취소"
        />
      )}
      {loadingModalOpen && (
        <LoadingModal
          title="경로 최적화 진행 중"
          text={["배차 계획을 만들고 있습니다.", "잠시만 기다려주세요."]}
          awaitFn={calculateDispatch}
          time={7000}
          intervalTime={10}
        />
      )}
    </div>
  );
};

export default Buttons;
