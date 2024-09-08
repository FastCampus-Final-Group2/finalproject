import Icon from "@/components/core/Icon";
import { cn } from "@/utils/cn";
import { dispatchListClass } from "./index.variants";
import ListCheckbox from "./ListCheckbox";

const tableHeader = [
  { text: "진행률", width: "small" as const },
  { text: "배차 코드", width: "extraLarge" as const },
  { text: "상하차 시작 일자", width: "large" as const },
  { text: "총 주문", width: "medium" as const },
  { text: "드라이버 수", width: "medium" as const },
  { text: "배차 담당자", width: "medium" as const },
];

interface ListHeaderProps {
  isAllChecked: boolean;
  onAllCheck: (isChecked: boolean) => void;
}

const ListHeader = ({ isAllChecked, onAllCheck }: ListHeaderProps) => {
  return (
    <ul className={cn(dispatchListClass({ backgroundColor: "header" }))}>
      <li className={cn(dispatchListClass({ width: "extraSmall" }))}>
        {/* 전체 선택 체크박스 */}
        <ListCheckbox isChecked={isAllChecked} onChange={() => onAllCheck(!isAllChecked)} />
      </li>
      {tableHeader.map((header, index) => (
        <li key={index} className={cn(dispatchListClass({ width: header.width, text: "medium" }))}>
          {header.text}
          <span>
            <Icon id="triangleUp" size={14} className="text-gray-300" />
            <Icon id="triangleDown" size={14} className="text-gray-300" />
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ListHeader;
