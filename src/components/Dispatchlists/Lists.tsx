import CheckBox from "@/components/core/CheckBox";
import { cn } from "@/utils/cn";
import { dispatchListClass } from "./index.variants";

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
  checkedItems: boolean[];
  onCheckBoxChange: (index: number) => void;
}

const Lists = ({ results, checkedItems, onCheckBoxChange }: ListsProps) => {
  return (
    <ul>
      {results.map((data, index) => {
        const isEmpty = !data.diapatchCode;
        const bgColor = checkedItems[index] ? "bg-gray-200" : index % 2 === 0 ? "" : "bg-gray-50";

        return (
          <li
            key={index}
            className={cn(
              dispatchListClass({
                hover: "please",
                height: "please",
                isChecked: checkedItems[index] ? "please" : undefined,
              }),
              bgColor,
            )}
          >
            <p className={cn(dispatchListClass({ width: "extraSmall" }))}>
              {/* todo: initialstate로 초기값을 내려주면 된다. */}
              {!isEmpty && <CheckBox initialState={checkedItems[index]} onChange={() => onCheckBoxChange(index)} />}
            </p>
            <p className={cn(dispatchListClass({ width: "small" }))}>{data.progress ? `${data.progress}%` : ""}</p>
            <p className={cn(dispatchListClass({ width: "extraLarge" }))}>
              <span className="w-1/2">{data.diapatchCode || ""}</span>
              <span className="w-1/2">{data.dispatchName || ""}</span>
            </p>
            <p className={cn(dispatchListClass({ width: "large" }))}>{data.startDateTime || ""}</p>
            <p className={cn(dispatchListClass({ width: "medium" }))}>{data.totalOrder || ""}</p>
            <p className={cn(dispatchListClass({ width: "medium" }))}>{data.smNum || ""}</p>
            <p className={cn(dispatchListClass({ width: "medium" }))}>{data.manager || ""}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default Lists;
