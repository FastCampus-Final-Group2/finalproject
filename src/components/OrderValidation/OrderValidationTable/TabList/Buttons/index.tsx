import Button from "@/components/core/Button";

const Buttons = () => {
  return (
    <div className="flex gap-4 px-2">
      <Button size="s" intent="secondary">
        업로드 취소
      </Button>
      <Button size="s" disabled>
        배차 진행
      </Button>
    </div>
  );
};

export default Buttons;
