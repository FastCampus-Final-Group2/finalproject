import { excelDataActiveTabState, excelDataPageState, excelDataState } from "@/atoms/excelData";
import { useResetRecoilState } from "recoil";

const useResetAllAtoms = () => {
  const resetExcelDataState = useResetRecoilState(excelDataState);
  const resetExcelDataActiveTabState = useResetRecoilState(excelDataActiveTabState);
  const resetExcelDataPageState = useResetRecoilState(excelDataPageState);

  const resetAllAtoms = () => {
    resetExcelDataState();
    resetExcelDataActiveTabState();
    resetExcelDataPageState();
  };

  return resetAllAtoms;
};

export default useResetAllAtoms;
