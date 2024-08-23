import ListHeader from "./ListHeader";
import Lists from "./Lists";

interface DispatchListsProps {
  data: {
    inProgress: number;
    waiting: number;
    completed: number;
    results: {
      progress: number;
      diapatchCode: string;
      dispatchName: string;
      startDateTime: string;
      totalOrder: number;
      smNum: number;
      manager: string;
    }[];
  };
}

const DispatchLists = ({ data }: DispatchListsProps) => {
  return (
    <div className="flex flex-col gap-[24px]">
      <div>
        <ListHeader />
        <Lists results={data.results} /> {/* 필터링된 results만 전달 */}
      </div>
    </div>
  );
};

export default DispatchLists;
