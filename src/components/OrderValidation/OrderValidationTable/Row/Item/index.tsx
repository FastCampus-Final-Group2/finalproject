"use client";

import { cn } from "@/utils/cn";
import { itemVariants } from "./index.variants";
import { ExcelDataHeader } from "@/types/excel";
import { useRecoilState, useRecoilValue } from "recoil";
import { excelDataState, selectedExcelDataSelector } from "@/atoms/excelData";
import { OrderValidationFunc } from "@/utils/validation/order";
import { useEffect, useState } from "react";
import { TransportAPI } from "@/apis/transportOrder";

interface ItemProps {
  rowIndex: number;
  header: ExcelDataHeader;
}

const Item = ({ rowIndex, header }: ItemProps) => {
  const selectedExcelData = useRecoilValue(selectedExcelDataSelector);
  const [excelData, setExcelData] = useRecoilState(excelDataState);
  const [debouncedSmNameValue, setDebouncedSmNameValue] = useState(selectedExcelData[rowIndex][header].value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSmNameValue(selectedExcelData[rowIndex][header].value);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [header, rowIndex, selectedExcelData]);

  useEffect(() => {
    if (header !== "smName") return;

    const validDebouncedSmName = async () => {
      const [error, smInfo] = await TransportAPI.valid({ requests: [{ smName: debouncedSmNameValue }] });

      if (error) {
        throw Error(error.data?.statusText);
      } else {
        const changedRow = selectedExcelData[rowIndex].rowId;

        setExcelData((prev) => {
          return [
            ...prev.slice(0, changedRow),
            {
              ...excelData[changedRow],
              [header]: {
                ...excelData[changedRow][header],
                id: smInfo[0].smId,
                isValid: smInfo[0].smNameValid,
              },
            },
            ...prev.slice(changedRow + 1),
          ];
        });
      }
    };

    validDebouncedSmName().catch(() => {
      const changedRow = selectedExcelData[rowIndex].rowId;
      setExcelData((prev) => {
        return [
          ...prev.slice(0, changedRow),
          {
            ...excelData[changedRow],
            [header]: {
              ...excelData[changedRow][header],
              id: 0,
              isValid: false,
            },
          },
          ...prev.slice(changedRow + 1),
        ];
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSmNameValue]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (header === "smName") {
      const changedRow = selectedExcelData[rowIndex].rowId;

      setExcelData((prev) => {
        return [
          ...prev.slice(0, changedRow),
          {
            ...excelData[changedRow],
            [header]: {
              ...excelData[changedRow][header],
              value: value,
            },
          },
          ...prev.slice(changedRow + 1),
        ];
      });
    } else {
      const isValid = OrderValidationFunc[header](value);
      const changedRow = selectedExcelData[rowIndex].rowId;

      setExcelData((prev) => {
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
      });
    }
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
