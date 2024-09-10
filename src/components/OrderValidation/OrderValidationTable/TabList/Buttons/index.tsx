"use client";

import { TransportAPI } from "@/apis/transportOrder";
import { dispatchNameState, excelDataState, isValidExcelDataState, loadingStartTimeState } from "@/atoms/excelData";
import ConfirmModal from "@/components/ConfirmModal";
import Button from "@/components/core/Button";
import useResetExcelDataAtoms from "@/hooks/useResetExcelDataAtoms";
import { formatTransportOrderRequest } from "@/utils/format/transportOrder";
import { useState } from "react";
import { useRecoilValue } from "recoil";

const Buttons = () => {
  const [cancelModalOpen, setCancelModalOpen] = useState(false);

  const resetExcelDataAtoms = useResetExcelDataAtoms();

  const loadingStartTime = useRecoilValue(loadingStartTimeState);
  const dispatchName = useRecoilValue(dispatchNameState);
  const excelData = useRecoilValue(excelDataState);
  const isValidExcelData = useRecoilValue(isValidExcelDataState);

  const handleClickCancelBtn = () => {
    setCancelModalOpen(true);
  };

  const handleClickDispathBtn = async () => {
    const transportOrderRequest = formatTransportOrderRequest(loadingStartTime, dispatchName, excelData);

    const [error, data] = await TransportAPI.postOrder(transportOrderRequest);

    console.log("error", error);
    console.log("data", data);
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
        onClick={handleClickDispathBtn}
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
    </div>
  );
};

export default Buttons;
