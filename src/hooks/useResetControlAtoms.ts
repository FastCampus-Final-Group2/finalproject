import { controlCheckboxState, controlOnlyClientState, controlPageState, controlSearchOptionState, controlSideTabDataState, controlSideTabState, controlTabState, lastVisitedControlPageState, searchDataState, searchEndTimeState, searchParamsState, searchStartTimeState, searchTextInputState } from "@/atoms/control";
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
  const resetControlSideTabDataState = useResetRecoilState(controlSideTabDataState);
  const resetControlSideTabState = useResetRecoilState(controlSideTabState);
  const resetSearchParamsState = useResetRecoilState(searchParamsState);

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
    resetControlSideTabDataState();
    resetControlSideTabState();
    resetSearchParamsState();
  };

  return resetControlAtoms;
};


export default useResetControlAtoms;