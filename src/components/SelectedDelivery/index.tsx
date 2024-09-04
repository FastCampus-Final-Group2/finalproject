import Button from "@/components/core/Button";
import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";

const SelectedDelivery = ({ selectedOrders }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalClose = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleCancel = () => {
    if (selectedOrders.length === 0) {
      alert("선택된 항목이 없습니다.");
      return;
    }
    // 선택된 항목들 중에 'WORK_WAITING'이 아닌 상태가 있는지 확인
    const hasNonWorkWaiting = selectedOrders.some((order) => order.dispatchDetailStatus !== "WORK_WAITING");
    if (hasNonWorkWaiting) {
      alert("선택된 항목이 잘못되었습니다. '작업 대기' 상태만 선택 가능합니다.");
    } else {
      alert("삭제 완료!");
      console.log("SelectDelivery에서 배송취소 버튼 클릭");
      handleModalClose();
    }
  };

  return (
    <>
      <div className="flex items-center justify-between text-T-18-B">
        <ul className="flex gap-[2px] pl-[8px]">
          <li>선택 배송</li>
          <li>
            <span className={`text-gray-500 ${selectedOrders.length >= 1 ? "text-red-500" : ""}`}>
              {selectedOrders.length}
            </span>
            건
          </li>
        </ul>
        <Button
          onClick={() => setIsModalOpen(true)} // Open the modal when clicking the delete icon
          iconId="circleCancelFill"
          size="i"
          className="text-B-14-B hover:text-white"
        >
          배송취소
        </Button>
      </div>
      {isModalOpen && (
        <ConfirmModal
          title="삭제 확인"
          text={[{ type: "alert", value: "배송 취소 시, 복구되지 않습니다." }]}
          leftButtonText="아니오"
          rightButtonText="네"
          onConfirm={handleCancel}
          onClickClose={handleModalClose}
        />
      )}
    </>
  );
};

export default SelectedDelivery;
