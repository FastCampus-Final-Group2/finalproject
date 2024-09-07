"use client";

import { cn } from "@/utils/cn";
import { itemVariants } from "./index.variants";
import { ExcelDataHeader } from "@/types/excel";
import { useRecoilState } from "recoil";
import { selectedExcelDataCellSelector } from "@/atoms/excelData";
import { OrderValidationFunc } from "@/utils/validation/order";
import { useEffect, useState } from "react";
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
    if (header !== "smName") return;

    const timer = setTimeout(() => {
      setDebouncedValue(selectedExcelDataCell.value);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [header, rowIndex, selectedExcelDataCell.value]);

  useEffect(() => {
    if (header !== "smName") return;

    const validDebouncedSmName = async () => {
      console.log(rowIndex, header, debouncedValue);
      const [error, smInfo] = await TransportAPI.valid({ requests: [{ smName: debouncedValue }] });

      if (error) {
        throw Error(error.data?.statusText);
      } else {
        setSelectedExcelDataCell({
          id: smInfo[0].smId,
          value: selectedExcelDataCell.value,
          isValid: smInfo[0].smNameValid,
        });
      }
    };

    validDebouncedSmName().catch(() => {
      setSelectedExcelDataCell({
        id: 0,
        value: selectedExcelDataCell.value,
        isValid: false,
      });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (header === "smName") {
      setSelectedExcelDataCell({
        ...selectedExcelDataCell,
        value: value,
      });
    } else {
      const isValid = OrderValidationFunc[header](value);

      setSelectedExcelDataCell({
        value: value,
        isValid: isValid,
      });
    }
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
