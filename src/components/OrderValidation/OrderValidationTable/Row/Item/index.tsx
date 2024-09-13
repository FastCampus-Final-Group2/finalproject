"use client";

import { cn } from "@/utils/cn";
import { itemVariants } from "./index.variants";
import { ExcelDataHeader } from "@/types/excel";
import { useRecoilState } from "recoil";
import { selectedExcelDataCellSelector } from "@/atoms/excelData";
import { OrderValidationFunc } from "@/utils/validation/order";
import { useCallback, useEffect, useState } from "react";
import { TransportAPI } from "@/apis/transportOrder";

interface ItemProps {
  rowIndex: number;
  header: ExcelDataHeader;
}

const Item = ({ rowIndex, header }: ItemProps) => {
  const [selectedExcelDataCell, setSelectedExcelDataCell] = useRecoilState(
    selectedExcelDataCellSelector({ rowIndex, header }),
  );
  const [debouncedValue, setDebouncedValue] = useState(selectedExcelDataCell.value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(selectedExcelDataCell.value);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [header, rowIndex, selectedExcelDataCell.value]);

  const validDebouncedSmName = useCallback(async () => {
    const [error, smInfo] = await TransportAPI.valid({ requests: [{ smName: debouncedValue }] });

    if (error) {
      throw Error(error.data?.statusText);
    }

    if (smInfo.validList && smInfo.validList[0].smId && smInfo.validList[0].smNameValid) {
      setSelectedExcelDataCell((prev) => ({
        ...prev,
        id: smInfo.validList[0].smId,
        isValid: smInfo.validList[0].smNameValid,
      }));
    } else {
      throw Error();
    }
  }, [debouncedValue, setSelectedExcelDataCell]);

  useEffect(() => {
    if (header === "smName") {
      validDebouncedSmName().catch(() => {
        setSelectedExcelDataCell((prev) => ({
          ...prev,
          id: -1,
          isValid: false,
        }));
      });
    } else {
      const isValid = OrderValidationFunc[header](debouncedValue);

      setSelectedExcelDataCell({
        value: debouncedValue,
        isValid: isValid,
      });
    }
  }, [debouncedValue, header, setSelectedExcelDataCell, validDebouncedSmName]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    setSelectedExcelDataCell((prev) => ({
      ...prev,
      value: value,
    }));
  };

  return (
    <input
      value={selectedExcelDataCell.value}
      className={cn(itemVariants({ isValid: selectedExcelDataCell.isValid }))}
      onChange={handleInputChange}
    />
  );
};

export default Item;
