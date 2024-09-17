import { bgColorState } from "@/atoms/bgColorState";
import {
  dispatchDataState,
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

  const resetDispatchManualAtoms = () => {
    resetBgColorState();
    resetRequestBodyChangeDispatchDataState();
    resetDispatchDataState();
    resetPendingOrderDataState();
    resetSelectedDriverState();
    resetSelectedPendingState();
  };

  return resetDispatchManualAtoms;
};

export default useResetDispatchManualAtoms;
