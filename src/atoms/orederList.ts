import { Order } from "@/types/order";
import { atom } from "recoil";

export const orderListState = atom<Order[]>({
  key: "orderListState",
  default: [],
});
