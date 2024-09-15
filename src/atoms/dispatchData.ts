import { atom } from "recoil";
import { persistAtom } from "./persistAtom";
import { DispatchResponse, CourseDetailResponse } from "@/models/ApiTypes";

export const dispatchDataState = atom<DispatchResponse | null>({
  key: "dispatchDataState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const pendingOrderDataState = atom<CourseDetailResponse[]>({
  key: "pendingOrderDataState",
  default: [], // 빈 배열로 시작
});
