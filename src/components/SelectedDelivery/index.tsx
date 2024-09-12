import { useState } from "react";
import ConfirmModal from "@/components/ConfirmModal";
import Icon from "@/components/core/Icon";
import { DeliveryRoutineDetailStatusItem } from "@/components/DeliveryRoutine/DeliveryRoutineDetail";
import { DispatchDetailApi } from "@/apis/dispatches/dispatchDetail";
import { DispatchCancelRequest } from "@/models/ApiTypes";

interface DispatchCancel extends DispatchCancelRequest {
  dispatchNumberIds: number[];
}

interface SelectedDeliveryProps {
  selectedOrders: DeliveryRoutineDetailStatusItem[];
  refreshData: () => void;
}

const SelectedDelivery = ({ selectedOrders, refreshData }: SelectedDeliveryProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCancel = async () => {
    if (selectedOrders.length === 0) {
      alert("선택된 항목이 없습니다.");
      setIsModalOpen(false);
      return;
    }

    const hasNonWorkWaiting = selectedOrders.some((order) => order.dispatchDetailStatus !== "WORK_WAITING");
    if (hasNonWorkWaiting) {
      alert("선택된 항목이 잘못되었습니다. '작업 대기' 상태만 선택 가능합니다.");
      setIsModalOpen(false);
      return;
    }

    try {
      const dispatchNumberIds = selectedOrders.map((order) => order.dispatchDetailId);
      console.log("dispatchNumberIds", dispatchNumberIds);
      const [error, response] = await DispatchDetailApi.orderCancel(dispatchNumberIds as unknown as DispatchCancel);

      if (error) {
        console.error("API 오류:", error);
        alert(`배송 취소 중 오류가 발생했습니다: ${error.type || "알 수 없는 오류"}`);
      } else if (response) {
        alert("배송 취소가 완료되었습니다.");
      }
    } catch (error) {
      console.error("예외 발생:", error);
      alert("서버 오류가 발생했습니다.");
    } finally {
      setIsModalOpen(false);
      refreshData();
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
        <button
          onClick={() => setIsModalOpen(true)} // Open the modal when clicking the delete icon
          className="flex items-center justify-center gap-[6px] rounded-[4px] bg-gray-100 px-[8px] py-[6px] text-B-14-B hover:bg-red-500 hover:text-white"
        >
          <Icon id="circleCancelFill" size={14} className="hover:text-white" />
          배송취소
        </button>
      </div>
      {isModalOpen && (
        <ConfirmModal
          title="삭제 확인"
          text={[{ type: "alert", value: "배송 취소 시, 복구되지 않습니다." }]}
          leftButtonText="아니오"
          rightButtonText="네"
          onConfirm={handleCancel}
          onClickClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default SelectedDelivery;
