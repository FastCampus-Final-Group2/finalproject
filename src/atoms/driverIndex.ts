import { atom } from "recoil";

export const driverIndex = atom<number>({
  key: "driverIndex",
  default: 0,
});
