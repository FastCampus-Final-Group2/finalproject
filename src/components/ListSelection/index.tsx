import Button from "@/components/core/Button";
import { useState } from "react";
import dispatchCancel from "@/apis/dispatches/dispatch/dispatchCancel";
import ConfirmModal from "@/components/ConfirmModal";

interface ListSelectionProps {
  currentCount: number;
  selectedCount: number;
}

const ListSelection = ({ currentCount, selectedCount }: ListSelectionProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelButtonClick = () => {
    if (selectedCount === 0) {
      alert("배차 목록을 선택해 주세요");
    } else {
      setIsModalOpen(true);
    }
  };
  const handleExcelDownloadButtonClick = () => {
    alert("준비 중인 기능입니다!");
  };

  const handleDeletdDispatchCode = async () => {
    // await dispatchCancel({
    //   isInTransit: true,
    //   dispatchNumberIds: [],
    // });
    alert("배차 강제 종료됨 ㅇㅇ");
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="flex items-center justify-between">
        <ul className="flex text-T-16-M">
          <li>총 {currentCount}건</li>
          <li>&nbsp;&nbsp;|&nbsp;&nbsp;</li>
          <li>선택 {selectedCount}건</li>
        </ul>
        <div className="flex">
          <Button size="s" intent="secondary" className="bg-gray-100" onClick={handleCancelButtonClick}>
            배차 강제 종료
          </Button>
          <Button size="s" shape="text" intent="secondary" onClick={handleExcelDownloadButtonClick}>
            엑셀 다운로드
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <ConfirmModal
          title="배차 강제 종료"
          text={[{ type: "alert", value: "배차 강제 종료 시, 복구되지 않습니다." }]}
          leftButtonText="아니오"
          rightButtonText="네"
          onConfirm={handleDeletdDispatchCode}
          onClickClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ListSelection;
