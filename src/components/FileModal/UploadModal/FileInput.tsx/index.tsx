"use client";

import { excelDataState } from "@/atoms/excelData";
import Icon from "@/components/core/Icon";
import { ExcelData } from "@/types/order";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import * as XLSX from "xlsx";
import { EXCEL_HEADERS } from "@/components/FileModal/UploadModal/index.constants";

interface FileInputProps {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileInput = ({ setIsError }: FileInputProps) => {
  const router = useRouter();
  const [excelFile, setExcelFile] = useState<File | null>(null);
  const setExcelData = useSetRecoilState(excelDataState);

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

        setExcelData(
          excelData.slice(4).map((row) => {
            return {
              deliveryType: row[0],
              smName: row[1],
              shipmentNum: row[2],
              clientOrderKey: row[3],
              orderType: row[4],
              receivedDate: row[5],
              serviceRequestDate: row[6],
              serviceRequestTime: row[7],
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
            } as ExcelData;
          }),
        );

        router.push("/dispatch");
      };

      reader.readAsArrayBuffer(excelFile);
    }
  }, [excelFile, router, setIsError, setExcelData]);

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
