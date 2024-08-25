"use client";

import Icon from "@/components/core/Icon";
import { useCallback, useRef } from "react";

interface FileInputProps {
  setExcelFile: React.Dispatch<React.SetStateAction<File | null>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const FileInput = ({ setIsError, setExcelFile }: FileInputProps) => {
  const validateAndSetFile = (uploadedFile: File | null) => {
    if (!uploadedFile) {
      setIsError(true);
      return;
    }

    if (!uploadedFile.type.includes("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")) {
      setIsError(true);
      return;
    }

    setExcelFile(uploadedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0] || null;
    validateAndSetFile(uploadedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const uploadedFile = e.dataTransfer.files?.[0] || null;
    validateAndSetFile(uploadedFile);
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
      <p className="text-gray-600 text-B-14-R">여기로 파일을 끌어오세요.</p>
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
