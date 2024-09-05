import { ExcelData } from "@/types/excel";
import { atom, selector, selectorFamily } from "recoil";
import { persistAtom } from "./persistAtom";
import { ORDER_VALIDATION_PER_PAGE } from "@/components/OrderValidation/OrderValidationTable/index.constants";
import { ORDER_VALIDATION_TABLE_TABS } from "@/components/OrderValidation/OrderValidationTable/TabList/index.constants";
import { ObjectValues } from "@/types/util";

export const excelDataState = atom<ExcelData[]>({
  key: "excelDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const excelDataActiveTabState = atom<ObjectValues<typeof ORDER_VALIDATION_TABLE_TABS>>({
  key: "excelDataActiveTabState",
  default: "전체",
  effects_UNSTABLE: [persistAtom],
});

export const excelDataPageState = atom<number>({
  key: "excelDataPageState",
  default: 1,
  effects_UNSTABLE: [persistAtom],
});

export const completeExcelDataSelector = selector<ExcelData[]>({
  key: "completeExcelDataSelector",
  get: ({ get }) => {
    const excelData = get(excelDataState);

    return excelData.filter((row) => {
      return Object.values(row).every((cell) => (typeof cell === "number" ? true : cell.isValid));
    });
  },
});

export const errorExcelDataSelector = selector<ExcelData[]>({
  key: "errorExcelDataSelector",
  get: ({ get }) => {
    const excelData = get(excelDataState);

    return excelData.filter((row) => {
      return Object.values(row).some((cell) => (typeof cell === "number" ? false : !cell.isValid));
    });
  },
});

export const excelDataTabNum = selector<{
  total: number;
  complete: number;
  error: number;
}>({
  key: "excelDataTabNum",
  get: ({ get }) => {
    const excelData = get(excelDataState);
    const completeExcelData = get(completeExcelDataSelector);
    const errorExcelData = get(errorExcelDataSelector);

    return {
      total: excelData.length,
      complete: completeExcelData.length,
      error: errorExcelData.length,
    };
  },
});

export const selectedExcelDataSelector = selector<ExcelData[]>({
  key: "selectedExcelDataSelector",
  get: ({ get }) => {
    const activeTab = get(excelDataActiveTabState);
    const excelData = get(excelDataState);
    const completeExcelData = get(completeExcelDataSelector);
    const errorExcelData = get(errorExcelDataSelector);

    switch (activeTab) {
      case "전체":
        return excelData;
      case "완료":
        return completeExcelData;
      case "오류":
        return errorExcelData;
    }
  },
});

export const selectedExcelDataLengthState = selector<number>({
  key: "selectedExcelDataLengthState",
  get: ({ get }) => {
    const tabValue = get(excelDataTabNum);
    const activeTab = get(excelDataActiveTabState);

    switch (activeTab) {
      case "전체":
        return tabValue.total;
      case "완료":
        return tabValue.complete;
      case "오류":
        return tabValue.error;
    }
  },
});

export const startRowSelector = selector<number>({
  key: "startRowSelector",
  get: ({ get }) => {
    const currentPage = get(excelDataPageState);

    const startRow = (currentPage - 1) * ORDER_VALIDATION_PER_PAGE;

    return startRow;
  },
});

export const endRowSelector = selector<number>({
  key: "endRowSelector",
  get: ({ get }) => {
    const selectedExcelDataLength = get(selectedExcelDataLengthState);
    const startRow = get(startRowSelector);

    return Math.min(startRow + ORDER_VALIDATION_PER_PAGE - 1, selectedExcelDataLength - 1);
  },
});

export const isValidRowState = selectorFamily<boolean, number>({
  key: "isValidRowState",
  get:
    (index: number) =>
    ({ get }) => {
      const selectedExcelData = get(selectedExcelDataSelector);

      return !Object.values(selectedExcelData[index]).some((cell) =>
        typeof cell === "number" ? false : !cell.isValid,
      );
    },
});

export const isValidExcelDataState = selector<boolean>({
  key: "isValidExcelDataState",
  get: ({ get }) => {
    const tabValue = get(excelDataTabNum);

    return tabValue.error === 0;
  },
});
