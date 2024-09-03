import Button from "@/components/core/Button";

const SelectedDelivery = ({ selectedOrders }) => {
  const handleCancel = () => {
    if (selectedOrders.length > 0) {
      alert("삭제 완료!");
      console.log("SelectDelivery에서 배송취소 버튼 클릭");
    } else {
      alert("선택된 항목이 없습니다.");
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
