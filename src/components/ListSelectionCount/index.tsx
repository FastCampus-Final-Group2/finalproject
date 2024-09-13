import Button from "@/components/core/Button";
import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import { DispatchApi } from "@/apis/dispatches/dispatch";

interface ListSelectionCountProps {
  currentCount: number;
  selectedCount: number;
  selectedDispatchIds: number[];
  refreshData: () => void;
}

const ListSelectionCount = ({
  currentCount,
  selectedCount,
  selectedDispatchIds,
  refreshData,
}: ListSelectionCountProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancelButtonClick = () => {
    if (selectedCount === 0) {
      alert("배차 목록을 선택해 주세요");
    } else {
      setIsModalOpen(true);
    }
  };

  // 배차 강제 종료 로직
  const handleDeletdDispatchCode = async () => {
    try {
      // 선택된 dispatchNumberId 배열을 서버로 전송
      await DispatchApi.dispatchCancel({ dispatchNumberIds: selectedDispatchIds });
      alert("배차가 성공적으로 강제 종료되었습니다.");
      setIsModalOpen(false);
      refreshData();
    } catch (error) {
      alert("배차 강제 종료에 실패했습니다.");
      console.error(error);
    }
  };

  const handleExcelDownloadButtonClick = () => {
    alert("준비 중인 기능입니다!");
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
          onConfirm={handleDeletdDispatchCode} // 삭제 처리 함수 호출
          onClickClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default ListSelectionCount;
