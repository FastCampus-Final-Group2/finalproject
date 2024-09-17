import { atom, selector, selectorFamily } from "recoil";
import { persistAtom } from "./persistAtom";
// import { CONTROL_TABS } from "@/components/TabForDispatchedList/index.constants";
import { TabForProgressStatus } from "@/types/dispatchNumber";
import { BgColorType } from "./bgColorState";
import dayjs from "dayjs";

// 검색 결과 데이터 유지
export const searchDataState = atom({
  key: "searchDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 오늘 날짜 유지
export const todayDateState = atom({
  key: "todayDateState",
  default: dayjs().format("YYYY-MM-DDTHH:mm:ss"),
  effects_UNSTABLE: [persistAtom],
});

// 7일 뒤 날짜 유지
export const sevenDaysLaterState = atom({
  key: "sevenDaysLaterState",
  default: dayjs().add(7, "day").format("YYYY-MM-DDTHH:mm:ss"),
  effects_UNSTABLE: [persistAtom],
});

// 검색 기간 설정 유지
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
export const controlTabState = atom<TabForProgressStatus>({
  key: "controlTabState",
  default: "주행중",
  effects_UNSTABLE: [persistAtom],
});

// 검색어 유지
export const searchTextInputState = atom({
  key: "searchTextInputState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

// 옵션 선택 유지
export const controlSearchOptionState = atom({
  key: "controlSearchOptionState",
  default: "[선택]",
  effects_UNSTABLE: [persistAtom],
});

// 내 담당 주문 선택 상태 유지
export const controlOnlyClientState = atom({
  key: "controlOnlyClientState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 목록 체크박스 체크 상태 유지
export const controlCheckboxState = atom({
  key: "controlCheckboxState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// 마지막 방문한 페이지 유지(for detail page)
export const lastVisitedControlPageState = atom<{
  general: string;
  detail: string | null;
}>({
  key: "lastVisitedControlPageState",
  default: {
    general: "/control",
    detail: null,
  },
  effects_UNSTABLE: [persistAtom],
});


// detail page 사이드탭 데이터 상태 유지하기
export const controlSideTabDataState = atom({
  key: "controlSideTabDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

// 사이드탭 열린 상태 유지하기
export const controlSideTabState = atom<{
  isExpanded: boolean;
  color: BgColorType;
  dispatchId: number | null;
}>({
  key: "controlSideTabState",
  default: {
    isExpanded: false,
    color: "lime",
    dispatchId: null,
  },
  effects_UNSTABLE: [persistAtom],
});

// 검색 파라미터 상태 유지
const todayDate = dayjs().format("YYYY-MM-DDTHH:mm:ss");
const sevenDaysLater = dayjs().add(7, "day").format("YYYY-MM-DDTHH:mm:ss");
export const searchParamsState = atom({
  key: "searchParamsState",
  default: {
    status: "IN_TRANSIT",
    isManager: false,
    startDateTime: todayDate,
    endDateTime: sevenDaysLater,
    searchOption: "",
    searchKeyword: "",
  },
  effects_UNSTABLE: [persistAtom],
});