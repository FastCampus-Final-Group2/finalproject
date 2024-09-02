import { atom } from "recoil";

export const myMenusState = atom<string[]>({
  key: "myMenusState",
  default: [],
});
