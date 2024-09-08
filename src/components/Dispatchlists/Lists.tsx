import { DispatchResult } from "@/models/ApiTypes";
import ListCheckbox from "./ListCheckbox";
import { cn } from "@/utils/cn";
import { dispatchListClass } from "./index.variants";
import Link from "next/link";

interface ListsProps {
  results: DispatchResult[];
  checkedItems: boolean[];
  onCheckBoxChange: (index: number) => void;
}

const Lists = ({ results, checkedItems, onCheckBoxChange }: ListsProps) => {
  const progressGraph = (progress: number) => {
    const calculateWidth = (82 / 100) * (progress || 0);
    return calculateWidth;
  };
  return (
    <ul>
      {results.map((data, index) => {
        const isEmpty = !data.dispatchCode; // 빈 항목 확인
        const isChecked = !isEmpty && checkedItems[index]; // 빈 항목 제외한 체크 상태
        const bgColor = isChecked ? "bg-gray-100" : index % 2 === 0 ? "" : "bg-gray-50"; // 빈 항목은 배경색 없음

        return (
          <li
            key={index}
            className={cn(
              dispatchListClass({
                hover: "please",
                height: "please",
                isChecked: isChecked ? "please" : undefined, // 빈 항목은 isChecked 적용 안함
              }),
              bgColor,
            )}
          >
            {/* 빈 항목이 아닌 경우만 체크박스 표시 */}
            <p className={cn(dispatchListClass({ width: "extraSmall" }))}>
              {!isEmpty && <ListCheckbox isChecked={checkedItems[index]} onChange={() => onCheckBoxChange(index)} />}
            </p>
            <p className={cn(dispatchListClass({ width: "small" }))}>
              <p className={`relative h-[12px] w-[82px] rounded-full bg-blue-50 ${isEmpty ? "hidden" : ""}`}>
                <p
                  className="absolute h-[12px] rounded-full bg-blue-500"
                  style={{ width: `${progressGraph(data.progress || 0)}` }}
                ></p>
              </p>
              <p>{data.progress ? `${data.progress}%` : ""}</p>
            </p>
            <p className={cn(dispatchListClass({ width: "extraLarge" }))}>
              <Link href={`/control/detail/${data.dispatchNumberId}`} key={index}>
                <span className="w-1/2">{data.dispatchCode || ""}</span>
              </Link>
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
