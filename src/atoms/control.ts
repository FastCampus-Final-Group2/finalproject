import { atom, selector, selectorFamily } from "recoil";
import { persistAtom } from "./persistAtom";
import { CONTROL_TABS } from "@/components/TabForDispatchedList/index.constants";

// todo: 검색 결과 데이터 유지
export const searchDataState = atom({
  key: "searchDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// todo: 검색 기간 설정 유지
export const searchStartTimeState = atom({
  key: "searchStartTimeState",
  default: "YYYY-MM-DD --:--",
  effects_UNSTABLE: [persistAtom],
});

export const searchEndTimeState = atom({
  key: "searchEndTimeState",
  default: "YYYY-MM-DD --:--",
  effects_UNSTABLE: [persistAtom],
});

// 페이지네이션 상태 유지
export const controlPageState = atom({
  key: "controlPageState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

// 탭(주행중, 주행대기, 주행완료) 전환 상태 유지
export const controlTabState = atom<ObjectValues<typeof CONTROL_TABS>>({
  key: "controlTabState",
  default: "주행중",
  effects_UNSTABLE: [persistAtom],
});

// todo: 검색어 유지
export const searchTextInputState = atom({
  key: "searchTextInputState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// todo: 옵션 선택 유지
export const controlSearchOptionState = atom({
  key: "controlSearchOptionState",
  default: "[선택]",
  effects_UNSTABLE: [persistAtom],
});

// todo: 내 담당 주문 선택 상태 유지
export const controlOnlyClientState = atom({
  key: "controlOnlyClientState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// todo: 목록 체크박스 체크 상태 유지
export const controlCheckboxState = atom({
  key: "controlCheckboxState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const lastVisitedControlPageState = atom<string>({
  key: "lastVisitedControlPageState",
  default: "/control",
  effects_UNSTABLE: [persistAtom],
});

export const selectedStatusAndDataState = selector({
  key: "selectedStatusAndDataState",
  get: ({ get }) => {
    const activeTab = get(controlTabState);
    const data = get(searchDataState);
    return { activeTab, data };
  },
  switch(activeTab) {

  }
});