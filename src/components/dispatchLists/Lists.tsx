import { dispatchListClass } from "./index.variants";
import { cn } from "@/utils/cn";
import CheckBox from "@/components/core/CheckBox";

interface ListsProps {
  results: {
    progress: number;
    diapatchCode: string;
    dispatchName: string;
    startDateTime: string;
    totalOrder: number;
    smNum: number;
    manager: string;
  }[];
}

const Lists = ({ results }: ListsProps) => {
  return (
    <ul>
      {results.map((data) => (
        <li key={data.diapatchCode} className={cn(dispatchListClass({ borderBottom: "please", hover: "please" }))}>
          <p className={cn(dispatchListClass({ width: "extraSmall" }))}>
            <CheckBox />
          </p>
          <p className={cn(dispatchListClass({ width: "small" }))}>{data.progress}%</p>
          <p className={cn(dispatchListClass({ width: "extraLarge" }))}>
            <span className="w-1/2">{data.diapatchCode}</span>
            <span className="w-1/2">{data.dispatchName}</span>
          </p>
          <p className={cn(dispatchListClass({ width: "large" }))}>{data.startDateTime}</p>
          <p className={cn(dispatchListClass({ width: "medium" }))}>{data.totalOrder}</p>
          <p className={cn(dispatchListClass({ width: "medium" }))}>{data.smNum}</p>
          <p className={cn(dispatchListClass({ width: "medium" }))}>{data.manager}</p>
        </li>
      ))}
    </ul>
  );
};

export default Lists;
