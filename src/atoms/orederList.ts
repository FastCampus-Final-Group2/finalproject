import { Order } from "@/types/order";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "orderListState",
  storage: typeof window !== "undefined" ? sessionStorage : undefined,
});

export const orderListState = atom<Order[]>({
  key: "orderListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
