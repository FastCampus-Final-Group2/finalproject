import {
  dispatchNameState,
  excelDataActiveTabState,
  excelDataPageState,
  excelDataState,
  loadingStartTimeState,
} from "@/atoms/excelData";
import { useResetRecoilState } from "recoil";

const useResetExcelDataAtoms = () => {
  const resetExcelDataState = useResetRecoilState(excelDataState);
  const resetExcelDataActiveTabState = useResetRecoilState(excelDataActiveTabState);
  const resetExcelDataPageState = useResetRecoilState(excelDataPageState);
  const resetDispatchNameState = useResetRecoilState(dispatchNameState);
  const resetLoadingStartTimeState = useResetRecoilState(loadingStartTimeState);

  const resetExcelDataAtoms = () => {
    resetExcelDataState();
    resetExcelDataActiveTabState();
    resetExcelDataPageState();
    resetDispatchNameState();
    resetLoadingStartTimeState();
  };

  return resetExcelDataAtoms;
};

export default useResetExcelDataAtoms;
