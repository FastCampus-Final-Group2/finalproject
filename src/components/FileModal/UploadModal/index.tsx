"use client";

import Icon from "@/components/core/Icon";
import FileInput from "./FileInput.tsx";
import Dimmed from "@/components/core/Dimmed";

interface UploadModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadModal = ({ setModalOpen, setIsError }: UploadModalProps) => {
  return (
    <Dimmed>
      <div className="flex flex-col gap-5 rounded-2xl bg-white p-8">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span className="text-gray-900 text-T-20-B">주문 업로드</span>
            <button type="button" className="flex items-center gap-1 text-blue-500 text-B-14-B">
              주문양식
              <Icon id="download" size={20} className="text-blue-500" />
            </button>
            <div className="flex-1" aria-hidden />
            <button type="button" onClick={() => setModalOpen(false)}>
              <Icon id="x" className="text-gray-800" />
            </button>
          </div>
          <div>수동배차를 진행할 주문목록을 업로드해 주세요.</div>
        </header>
        <FileInput setIsError={setIsError} />
      </div>
    </Dimmed>
  );
};

export default UploadModal;
