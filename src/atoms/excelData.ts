import { DefaultExcelDataValue, ExcelData, ExcelDataHeader, SmNameExcelDataValue } from "@/types/excel";
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

export const dispatchNameState = atom<string>({
  key: "dispatchNameState",
  default: "",
  effects_UNSTABLE: [persistAtom],
});

export const loadingStartTimeState = atom<string>({
  key: "loadingStartTimeState",
  default: "YYYY-MM-DD --:--",
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

export const selectedExcelDataLengthSelector = selector<number>({
  key: "selectedExcelDataLengthSelector",
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

export const selectedExcelDataRowIdsSelector = selector<number[]>({
  key: "selectedExcelDataRowIdsSelector",
  get: ({ get }) => {
    const currentPage = get(excelDataPageState);
    const selectedExcelData = get(selectedExcelDataSelector);
    const selectedExcelDataLength = get(selectedExcelDataLengthSelector);

    const startRow = (currentPage - 1) * ORDER_VALIDATION_PER_PAGE;
    const endRow = Math.min(startRow + ORDER_VALIDATION_PER_PAGE - 1, selectedExcelDataLength - 1);

    const rowIds = Array.from({ length: endRow - startRow + 1 }).map((_, index) => {
      return selectedExcelData[startRow + index].rowId;
    });

    return rowIds;
  },
});

export const selectedExcelDataRowIdSelector = selectorFamily<number, number>({
  key: "selectedExcelDataRowIdSelector",
  get:
    (rowIndex) =>
    ({ get }) => {
      const selectedExcelData = get(selectedExcelDataSelector);

      return selectedExcelData[rowIndex].rowId;
    },
});

export const excelDataCellSelector = selectorFamily<
  DefaultExcelDataValue | SmNameExcelDataValue,
  { rowId: number; header: ExcelDataHeader }
>({
  key: "excelDataCellSelector",
  get:
    ({ rowId, header }) =>
    ({ get }) => {
      const excelData = get(excelDataState);

      return excelData[rowId][header];
    },
  set:
    ({ rowId, header }) =>
    ({ set, get }, newValue) => {
      const excelData = get(excelDataState);

      set(excelDataState, [
        ...excelData.slice(0, rowId),
        {
          ...excelData[rowId],
          [header]: newValue,
        },
        ...excelData.slice(rowId + 1),
      ]);
    },
});

export const selectedExcelDataCellSelector = selectorFamily<
  DefaultExcelDataValue | SmNameExcelDataValue,
  { rowIndex: number; header: ExcelDataHeader }
>({
  key: "selectedExcelDataCellSelector",
  get:
    ({ rowIndex, header }) =>
    ({ get }) => {
      const selectedExcelData = get(selectedExcelDataSelector);

      return selectedExcelData[rowIndex][header];
    },
  set:
    ({ rowIndex, header }) =>
    ({ set, get }, newValue) => {
      const excelData = get(excelDataState);
      const selectedExcelData = get(selectedExcelDataSelector);

      const changedRow = selectedExcelData[rowIndex].rowId;

      set(excelDataState, [
        ...excelData.slice(0, changedRow),
        {
          ...excelData[changedRow],
          [header]: newValue,
        },
        ...excelData.slice(changedRow + 1),
      ]);
    },
});

export const isValidRowState = selectorFamily<boolean, number>({
  key: "isValidRowState",
  get:
    (rowId: number) =>
    ({ get }) => {
      const excelData = get(excelDataState);

      return !Object.values(excelData[rowId]).some((cell) => (typeof cell === "number" ? false : !cell.isValid));
    },
});

export const isValidExcelDataState = selector<boolean>({
  key: "isValidExcelDataState",
  get: ({ get }) => {
    const tabValue = get(excelDataTabNum);

    return tabValue.error === 0;
  },
});
