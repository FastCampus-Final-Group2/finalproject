import Button from "@/components/core/Button";

const SelectedDelivery = ({ selectedOrders }) => {
  const handleCancel = () => {
    if (selectedOrders.length === 0) {
      alert("선택된 항목이 없습니다.");
      return;
    }

    // 모든 선택된 항목이 WORK_WAITING 상태인지 확인
    const allWorkWaiting = selectedOrders.every((order) => order.status === "WORK_WAITING");

    if (allWorkWaiting) {
      alert("삭제 완료!");
      console.log("SelectDelivery에서 배송취소 버튼 클릭");
    } else {
      alert("선택된 항목이 잘못되었습니다. '작업 대기' 상태만 선택 가능합니다.");
    }
  };

  return (
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
      <Button onClick={handleCancel} iconId="circleCancelFill" size="i" className="text-B-14-B hover:text-white">
        배송취소
      </Button>
    </div>
  );
};

export default SelectedDelivery;
