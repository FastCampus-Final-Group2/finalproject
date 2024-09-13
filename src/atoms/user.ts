import { atom } from "recoil";
import { persistAtom } from "./persistAtom";

export const userState = atom<string | null>({
  key: "userState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
