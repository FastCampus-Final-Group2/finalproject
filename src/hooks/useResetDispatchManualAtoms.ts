import { bgColorState } from "@/atoms/bgColorState";
import {
  dispatchDataState,
  isClickPendingOrderListState,
  pendingOrderDataState,
  selectedDriverState,
  selectedPendingState,
} from "@/atoms/dispatchData";
import {
  plusMinusEstimatedTimetState,
  plusMinusTotalErrorOrdertState,
  plusMinusTotalOrdertState,
  plusMinusVolumeState,
  plusMinusWeightState,
} from "@/atoms/plusMinus";
import { requestBodyChangeDispatchDataState } from "@/atoms/requestBodyChangeDispatchData";
import { useResetRecoilState } from "recoil";

const useResetDispatchManualAtoms = () => {
  const resetBgColorState = useResetRecoilState(bgColorState);
  const resetRequestBodyChangeDispatchDataState = useResetRecoilState(requestBodyChangeDispatchDataState);
  const resetDispatchDataState = useResetRecoilState(dispatchDataState);
  const resetPendingOrderDataState = useResetRecoilState(pendingOrderDataState);
  const resetSelectedDriverState = useResetRecoilState(selectedDriverState);
  const resetSelectedPendingState = useResetRecoilState(selectedPendingState);
  const resetIsClickPendingOrderListState = useResetRecoilState(isClickPendingOrderListState);
  const resetPlusMinusVolume = useResetRecoilState(plusMinusVolumeState);
  const resetPlusMinusWeight = useResetRecoilState(plusMinusWeightState);
  const resetPlusMinusTotalOrder = useResetRecoilState(plusMinusTotalOrdertState);
  const resetPlusMinusEstimatedTime = useResetRecoilState(plusMinusEstimatedTimetState);
  const resetPlusMinusTotalErrorOrdert = useResetRecoilState(plusMinusTotalErrorOrdertState);

  const resetDispatchManualAtoms = () => {
    resetBgColorState();
    resetRequestBodyChangeDispatchDataState();
    resetDispatchDataState();
    resetPendingOrderDataState();
    resetSelectedDriverState();
    resetSelectedPendingState();
    resetIsClickPendingOrderListState();
    resetPlusMinusVolume();
    resetPlusMinusWeight();
    resetPlusMinusTotalOrder();
    resetPlusMinusEstimatedTime();
    resetPlusMinusTotalErrorOrdert();
  };

  return resetDispatchManualAtoms;
};

export default useResetDispatchManualAtoms;
