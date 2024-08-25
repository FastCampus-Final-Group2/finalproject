import Button from "@/components/core/Button";

interface ListSelectionProps {
  data: {
    inProgress: number;
    waiting: number;
    completed: number;
  };
}

const ListSelection = ({ data }: ListSelectionProps) => {
  return (
    <div className="flex items-center justify-between">
      <ul className="flex text-T-16-M">
        <li>총 {data.inProgress + data.waiting + data.completed}건</li>
        <li>&nbsp;|&nbsp;</li>
        <li>선택 00건</li>
      </ul>
      <div className="flex">
        <Button size="s" shape="text" intent="secondary" className="bg-gray-100">
          배차 강제 종료
        </Button>
        <Button size="s" shape="text" intent="secondary">
          액셀 다운로드
        </Button>
      </div>
    </div>
  );
};

export default ListSelection;
