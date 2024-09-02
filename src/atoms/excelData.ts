import { ExcelData } from "@/types/order";
import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const { persistAtom } = recoilPersist({
  key: "excelDataState",
  storage: typeof window !== "undefined" ? sessionStorage : undefined,
});

export const excelDataState = atom<ExcelData[]>({
  key: "excelDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});
