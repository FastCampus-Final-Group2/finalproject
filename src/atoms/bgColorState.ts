import { atom } from "recoil";

// 사용할 수 있는 색상 값들을 타입으로 지정합니다.
export type BgColorType =
  | "lime"
  | "sky"
  | "purple"
  | "violet"
  | "redwood"
  | "peanut"
  | "brown"
  | "forest"
  | "yale"
  | "olive";

// atom에서 해당 타입을 사용합니다.
export const bgColorState = atom<BgColorType>({
  key: "bgColorState",
  default: "lime", // 기본 값 설정
});
