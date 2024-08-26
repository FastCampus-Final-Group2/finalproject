import { ExcelData, Order } from "@/types/order";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "orderListState",
  storage: sessionStorage,
});

export const orderListState = atom<Order[] | ExcelData[]>({
  key: "orderListState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
