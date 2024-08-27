import Button from "@/components/core/Button";

const OrderValidationButtons = () => {
  return (
    <div className="mx-2.5 flex w-full items-center justify-end">
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

export default OrderValidationButtons;
