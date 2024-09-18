import { bgColorState } from "@/atoms/bgColorState";
import {
  dispatchDataState,
  isClickPendingOrderListState,
  pendingOrderDataState,
  selectedDriverState,
  selectedPendingState,
} from "@/atoms/dispatchData";
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

  const resetDispatchManualAtoms = () => {
    resetBgColorState();
    resetRequestBodyChangeDispatchDataState();
    resetDispatchDataState();
    resetPendingOrderDataState();
    resetSelectedDriverState();
    resetSelectedPendingState();
    resetIsClickPendingOrderListState();
  };

  return resetDispatchManualAtoms;
};

export default useResetDispatchManualAtoms;
