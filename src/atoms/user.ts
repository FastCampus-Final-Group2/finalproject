import { atom } from "recoil";
import { persistAtom } from "./persistAtom";

export const userState = atom<string | undefined>({
  key: "userState",
  default: undefined,
  effects_UNSTABLE: [persistAtom],
});
