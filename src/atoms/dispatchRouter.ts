import { atom } from "recoil";
import { persistAtom } from "./persistAtom";

export const dispatchRouterState = atom<boolean>({
  key: "dispatchRouterState",
  default: false,
  effects_UNSTABLE: [persistAtom],
});
