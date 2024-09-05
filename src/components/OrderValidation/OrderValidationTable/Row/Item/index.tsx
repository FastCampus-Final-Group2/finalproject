"use client";

import { cn } from "@/utils/cn";
import { itemVariants } from "./index.variants";
import { ExcelDataHeader } from "@/types/excel";
import { useRecoilState, useRecoilValue } from "recoil";
import { excelDataState, selectedExcelDataSelector } from "@/atoms/excelData";
import { OrderValidationFunc } from "@/utils/validation/order";

interface ItemProps {
  rowIndex: number;
  header: ExcelDataHeader;
}

const Item = ({ rowIndex, header }: ItemProps) => {
  const selectedExcelData = useRecoilValue(selectedExcelDataSelector);
  const [excelData, setExcelData] = useRecoilState(excelDataState);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    const isValid = OrderValidationFunc[header](value);
    const changedRow = selectedExcelData[rowIndex].rowId;

    setExcelData((prev) => {
      if (typeof isValid === "boolean") {
        return [
          ...prev.slice(0, changedRow),
          {
            ...excelData[changedRow],
            [header]: {
              value: value,
              isValid: isValid,
            },
          },
          ...prev.slice(changedRow + 1),
        ];
      } else {
        return [
          ...prev.slice(0, changedRow),
          {
            ...excelData[changedRow],
            smName: {
              value: value,
              id: isValid.id,
              isValid: isValid.isValid,
            },
          },
          ...prev.slice(changedRow + 1),
        ];
      }
    });
  };

  return (
    <input
      value={selectedExcelData[rowIndex][header].value}
      className={cn(itemVariants({ isValid: selectedExcelData[rowIndex][header].isValid }))}
      onChange={handleInputChange}
    />
  );
};

export default Item;
