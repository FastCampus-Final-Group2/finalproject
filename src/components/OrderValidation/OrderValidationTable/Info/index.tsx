import Button from "@/components/core/Button";

interface OrderValidationInfo {
  totalNum: number;
}

const OrderValidationInfo = ({ totalNum }: OrderValidationInfo) => {
  return (
    <div className="flex w-full items-center justify-between">
      <div className="px-4 text-gray-900 text-T-16-M">{`총 ${totalNum}건`}</div>
      <div className="flex gap-4 px-2">
        <Button size="s" intent="secondary">
          업로드 취소
        </Button>
        <Button size="s" disabled>
          배차 진행
        </Button>
      </div>
    </div>
  );
};

export default OrderValidationInfo;
