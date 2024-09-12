import { atom, selector, selectorFamily } from "recoil";
import { persistAtom } from "./persistAtom";

// todo: control/detail/{dispatchCodeId} 페이지 데이터 유지?
export const controlDetailDataState = atom({
  key: "controlDetailDataState",
  default: {},
  effects_UNSTABLE: [persistAtom],
});


// todo: 특정 기사 선택 시 사이드탭 열림 상태 유지
export const selectedDriverSideTabState = atom({
  key: "selectedDriverSideTabState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});

// todo: 이슈 선택 시 읽음 처리
export const issueReadState = atom({
  key: "issueReadState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});