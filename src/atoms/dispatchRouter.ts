import { atom } from "recoil";

export const dispatchRouterState = atom<boolean>({
  key: "dispatchRouterState",
  default: false,
});
