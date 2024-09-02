"use client";

import Button from "@/components/core/Button";

const SelectedDelivery = () => {
  const handleCancel = () => {
    alert("SelectDelivery에서 배송취소 버튼 클릭");
    console.log("SelectDelivery에서 배송취소 버튼 클릭");
  };
  return (
    <div className="flex items-center justify-between text-T-18-B">
      <ul className="flex gap-[2px] pl-[8px]">
        <li>선택 배송</li>
        <li>
          <span className="text-gray-500">0</span>건
        </li>
      </ul>
      <Button onClick={handleCancel} iconId="circleCancelFill" size="i" className="text-B-14-B hover:text-white">
        배송취소
      </Button>
    </div>
  );
};

export default SelectedDelivery;
