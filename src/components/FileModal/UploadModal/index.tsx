"use client";

import Icon from "@/components/core/Icon";
import FileInput from "./FileInput.tsx";
import Dimmed from "@/components/core/Dimmed";
import { TransportAPI } from "@/apis/transportOrder";

interface UploadModalProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsError: React.Dispatch<React.SetStateAction<boolean>>;
}

const UploadModal = ({ setModalOpen, setIsError }: UploadModalProps) => {
  // TODO
  const handleExcelExampleBtn = async () => {
    const [error, data] = await TransportAPI.excelExample();

    console.log(data);
    console.log(error);
    // await axios
    //   .get("/transport-order/excel-example", {
    //     responseType: "arraybuffer", // 바이너리 데이터를 받기 위해 설정
    //     headers: {
    //       "Content-Type": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //     },
    //     withCredentials: true,
    //   })
    //   .then((response) => {
    //     // Blob을 생성하여 파일 다운로드
    //     const blob = new Blob([response.data], {
    //       type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    //     });
    //     const url = window.URL.createObjectURL(blob);
    //     const link = document.createElement("a");
    //     link.href = url;
    //     link.setAttribute("download", "filename.xlsx"); // 원하는 파일 이름으로 설정
    //     document.body.appendChild(link);
    //     link.click();
    //     link.remove();
    //   })
    //   .catch((error) => {
    //     console.error("Error downloading the file:", error);
    //   });
  };

  return (
    <Dimmed>
      <div className="flex flex-col gap-5 rounded-2xl bg-white p-8">
        <header className="flex flex-col gap-3">
          <div className="flex items-center gap-4">
            <span className="text-gray-900 text-T-20-B">주문 업로드</span>
            <button
              type="button"
              className="flex items-center gap-1 text-blue-500 text-B-14-B"
              onClick={handleExcelExampleBtn}
            >
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
