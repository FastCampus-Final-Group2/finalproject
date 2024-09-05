"use client";

import { loadingStartTimeState } from "@/atoms/dipatchData";
import { excelDataActiveTabState, excelDataPageState, excelDataState, isValidExcelDataState } from "@/atoms/excelData";
import Button from "@/components/core/Button";
import { useRecoilValue, useResetRecoilState } from "recoil";

const Buttons = () => {
  const resetExcelData = useResetRecoilState(excelDataState);
  const resetExcelDataActiveTab = useResetRecoilState(excelDataActiveTabState);
  const resetExcelDataPage = useResetRecoilState(excelDataPageState);

  const loadingStartTime = useRecoilValue(loadingStartTimeState);
  const isValidExcelData = useRecoilValue(isValidExcelDataState);

  const handleClickCancelBtn = () => {
    resetExcelData();
    resetExcelDataPage();
    resetExcelDataActiveTab();
  };

  return (
    <div className="flex gap-4 px-2">
      <Button size="s" intent="secondary" type="button" onClick={handleClickCancelBtn}>
        업로드 취소
      </Button>
      <Button size="s" disabled={!(!!loadingStartTime && isValidExcelData)}>
        배차 진행
      </Button>
    </div>
  );
};

export default Buttons;
