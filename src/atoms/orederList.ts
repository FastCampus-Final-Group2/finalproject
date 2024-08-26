import { Order } from "@/types/order";
import { atom } from "recoil";

export const orderListState = atom<Partial<Order>[]>({
  key: "orderListState",
  default: [],
});
