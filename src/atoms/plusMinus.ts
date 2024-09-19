import { atom } from "recoil";

// plusMinusVolume 상태를 관리하는 Atom
export const plusMinusVolumeState = atom({
  key: "plusMinusVolumeState",
  default: 0, // 초기값
});

// plusMinusWeight 상태를 관리하는 Atom
export const plusMinusWeightState = atom({
  key: "plusMinusWeightState",
  default: 0, // 초기값
});

export const plusMinusTotalOrdertState = atom({
  key: "plusMinusTotalOrdertState",
  default: 0, // 초기값
});

export const plusMinusEstimatedTimetState = atom({
  key: "plusMinusEstimatedTimetState",
  default: 0, // 초기값
});

export const plusMinusTotalErrorOrdertState = atom({
  key: "plusMinusTotalErrorOrdertState",
  default: 0, // 초기값
});
