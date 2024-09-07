import { atom } from "recoil";
import { persistAtom } from "./persistAtom";
import { DispatchResponse } from "@/models/ApiTypes";

export const orderListState = atom<DispatchResponse | null>({
  key: "orderListState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
