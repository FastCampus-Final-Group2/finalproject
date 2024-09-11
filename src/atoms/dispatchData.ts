import { atom } from "recoil";
import { persistAtom } from "./persistAtom";
import { DispatchResponse } from "@/models/ApiTypes";

export const dispatchDataState = atom<DispatchResponse | null>({
  key: "dispatchDataState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});
