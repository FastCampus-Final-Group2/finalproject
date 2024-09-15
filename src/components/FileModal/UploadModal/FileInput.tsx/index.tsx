"use client";

import { excelDataState } from "@/atoms/excelData";
import Icon from "@/components/core/Icon";
import { useCallback, useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import { handleExcelFile } from "@/utils/validation/excel";
import ProgressBar from "@/components/core/ProgressBar";
import { cn } from "@/utils/cn";
import { fileInputVariants } from "./index.variants";
import { userState } from "@/atoms/user";

interface FileInputProps {
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileInput = ({ setIsError }: FileInputProps) => {
  const setUser = useSetRecoilState(userState);

  const [excelFile, setExcelFile] = useState<File | null>(null);
  const setExcelData = useSetRecoilState(excelDataState);

  const handleFileInput = useCallback(() => {
    return new Promise<void>((resolve, reject) => {
      if (!excelFile) return reject(new Error("No file"));

      const reader = new FileReader();

      reader.onload = async (event) => {
        try {
          const arrayBuffer = event.target?.result as ArrayBuffer;

          const [error, validedExcelData] = await handleExcelFile(arrayBuffer);

          if (error) {
            if (error.status === 401) {
              setUser(null);
            }
            throw new Error("Invalid Excel Data");
          } else {
            setTimeout(() => {
              setExcelData(validedExcelData);
            }, 1000);
          }

          resolve();
        } catch (err) {
          setIsError(true);
          reject(err);
        }
      };

      reader.readAsArrayBuffer(excelFile);
    });
  }, [excelFile, setExcelData, setIsError, setUser]);

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
      className={cn(fileInputVariants({ hasFile: excelFile !== null }))}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
    >
      <Icon id="upload" size={32} className="text-gray-600" />
      <p className="text-gray-600 text-B-14-R">{excelFile ? excelFile.name : "여기로 파일을 끌어오세요."}</p>
      <label className="relative">
        {excelFile ? (
          <div className="w-[276px]">
            <ProgressBar awaitFn={handleFileInput} barColor="bg-blue-500" bgColor="bg-white" />
          </div>
        ) : (
          <button
            className="rounded border border-gray-600 bg-white px-2 py-1 text-gray-600 text-B-14-R"
            type="button"
            onClick={handleUploadButton}
          >
            파일 선택
          </button>
        )}
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
