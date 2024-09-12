import { controlCheckboxState, controlOnlyClientState, controlPageState, controlSearchOptionState, controlTabState, searchDataState, searchEndTimeState, searchStartTimeState, searchTextInputState } from "@/atoms/control";
import { useResetRecoilState } from "recoil";

const useResetControlAtoms = () => {
  const resetSearchDataState = useResetRecoilState(searchDataState);
  const resetSearchStartTimeState = useResetRecoilState(searchStartTimeState);
  const resetSearchEndTimeState = useResetRecoilState(searchEndTimeState);
  const resetControlPageState = useResetRecoilState(controlPageState);
  const resetControlTabState = useResetRecoilState(controlTabState);
  const resetSearchTextInputState = useResetRecoilState(searchTextInputState);
  const resetControlSearchOptionState = useResetRecoilState(controlSearchOptionState);
  const resetControlOnlyClientState = useResetRecoilState(controlOnlyClientState);
  const resetControlCheckboxState = useResetRecoilState(controlCheckboxState);

  const resetControlAtoms = () => {
    resetSearchDataState();
    resetSearchStartTimeState();
    resetSearchEndTimeState();
    resetControlPageState();
    resetControlTabState();
    resetSearchTextInputState();
    resetControlSearchOptionState();
    resetControlOnlyClientState();
    resetControlCheckboxState();
  };

  return resetControlAtoms;
};

export default useResetControlAtoms;