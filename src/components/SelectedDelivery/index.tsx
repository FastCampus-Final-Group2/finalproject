import Button from "@/components/core/Button";

const SelectedDelivery = () => {
  return (
    <div className="flex justify-between">
      <ul className="flex gap-[2px] pl-[8px]">
        <li>선택 배송</li>
        <li>
          <span className="text-gray-500">0</span>건
        </li>
      </ul>
      <Button iconId="circleCancelFill" size="i" className="text-B-14-B hover:text-white">
        배송취소
      </Button>
    </div>
  );
};

export default SelectedDelivery;
