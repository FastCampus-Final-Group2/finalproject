"use client";

import { cn } from "@/utils/cn";
import { itemVariants } from "./index.variants";
import { ExcelDataHeader } from "@/types/excel";
import { useRecoilState } from "recoil";
import { excelDataCellSelector } from "@/atoms/excelData";
import { OrderValidationFunc } from "@/utils/validation/order";
import { useEffect, useState } from "react";
import { TransportAPI } from "@/apis/transportOrder";

interface ItemProps {
  rowId: number;
  header: ExcelDataHeader;
}

const Item = ({ rowId, header }: ItemProps) => {
  const [excelDataCell, setExcelDataCell] = useRecoilState(excelDataCellSelector({ rowId, header }));
  const [debouncedValue, setDebouncedValue] = useState(excelDataCell.value);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedValue !== excelDataCell.value) setDebouncedValue(excelDataCell.value);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [header, excelDataCell.value, debouncedValue]);

  useEffect(() => {
    if (header === "smName") {
      TransportAPI.valid({ requests: [{ smName: debouncedValue }] })
        .then(([error, smInfo]) => {
          if (error) {
            throw Error(error.data?.statusText);
          }

          setExcelDataCell((prev) => ({
            ...prev,
            id: smInfo.validList[0].smId,
            isValid: smInfo.validList[0].smNameValid,
          }));
        })
        .catch(() => {
          setExcelDataCell((prev) => ({
            ...prev,
            id: -1,
            isValid: false,
          }));
        });
    } else {
      const isValid = OrderValidationFunc[header](debouncedValue);

      setExcelDataCell({
        value: debouncedValue,
        isValid: isValid,
      });
    }
  }, [debouncedValue, header, setExcelDataCell]);

  const handleInputChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const value = event.target.value;

    if (header === "smName") {
      setExcelDataCell((prev) => ({
        ...prev,
        id: -1,
        value: value,
      }));
    } else {
      setExcelDataCell((prev) => ({
        ...prev,
        value: value,
      }));
    }
  };

  return (
    <input
      value={excelDataCell.value}
      className={cn(itemVariants({ isValid: excelDataCell.isValid }))}
      onChange={handleInputChange}
    />
  );
};

export default Item;
