import { Order } from "@/types/order";
import { atom } from "recoil";
import { persistAtom } from "./persistAtom";

export const orderListState = atom<Order[]>({
  key: "orderListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const dispatchNameState = atom<string>({
  key: "dispatchNameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const loadingStartTimeState = atom<string>({
  key: "loadingStartTimeState",
  default: "YYYY-MM-DD --:--",
  effects_UNSTABLE: [persistAtom],
});
