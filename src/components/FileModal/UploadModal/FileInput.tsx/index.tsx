"use client";

import { orderListState } from "@/atoms/orederList";
import Icon from "@/components/core/Icon";
import { EXCEL_HEADERS } from "@/constants/excel";
import { Order } from "@/types/order";
import { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import * as XLSX from "xlsx";

interface FileInputProps {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileInput = ({ setIsError }: FileInputProps) => {
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const setOrderList = useSetRecoilState(orderListState);
  const ol = useRecoilValue(orderListState);
  console.log(ol);
  // TODO
  useEffect(() => {
    if (excelFile) {
      if (!excelFile.type.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
        setIsError(true);
        return;
      }

      const reader = new FileReader();

      reader.onload = (event) => {
        const arrayBuffer = event.target?.result as ArrayBuffer;
        const workbook = XLSX.read(arrayBuffer, { type: "array" });

        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = (XLSX.utils.sheet_to_json(worksheet, { header: 1 }) as unknown[][]).filter((row) =>
          row.some((cell) => cell !== undefined && cell !== ""),
        );
        console.log(excelData);

        const isExcelHeaderCorrect = excelData[0].every((header, index) => {
          return header === EXCEL_HEADERS[index];
        });

        if (!isExcelHeaderCorrect) {
          setIsError(true);
          return;
        }

        const hasData = excelData.some((row, index) => {
          if (index < 4) return true;
          return row.length > 0;
        });

        if (!hasData) {
          setIsError(true);
          return;
        }

        setOrderList(
          excelData.slice(4).map((row) => {
            return {
              deliveryType: row[0],
              smName: row[1],
              shipmentNum: row[2],
              clientOrderKey: row[3],
              orderType: row[4],
              // TODO 날짜 수정
              receivedDate: new Date(2024, 8, 25),
              serviceRequestDate: new Date(2024, 9, 1),
              serviceRequestTime: new Date(2024, 9, 1, 15, 30),
              clientName: row[8],
              contact: row[9],
              address: row[10],
              detailAddress: row[11],
              zipcode: row[12],
              volume: Number(row[13]),
              weight: Number(row[14]),
              note: row[15],
              expectedServiceDuration: row[16] ? Number(row[16]) : undefined,
              productName: row[17],
              productCode: row[18],
              productQuantity: Number(row[19]),
            } as Partial<Order>;
          }),
        );
      };

      reader.readAsArrayBuffer(excelFile);
    }
  }, [excelFile, setIsError, setOrderList]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    setExcelFile(uploadedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files?.[0] || null;
    setExcelFile(uploadedFile);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const fileRef = useRef<HTMLInputElement>(null);

  const handleUploadButton = useCallback(() => {
    fileRef?.current?.click();
  }, [fileRef]);

  return (
    <div
      role="input"
      className="flex w-[456px] flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-gray-400 bg-gray-30 px-4 py-8"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Icon id="upload" size={32} className="text-gray-600" />
      <p className="text-gray-600 text-B-14-R">{excelFile ? excelFile.name : "여기로 파일을 끌어오세요."}</p>
      <label className="relative">
        <button
          className="rounded border border-gray-600 bg-white px-2 py-1 text-gray-600 text-B-14-R"
          type="button"
          onClick={handleUploadButton}
        >
          파일 선택
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
};

export default FileInput;
