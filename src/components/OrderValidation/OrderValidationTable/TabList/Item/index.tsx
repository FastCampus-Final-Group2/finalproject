"use client";

import { cn } from "@/utils/cn";
import { tabValueVariants, tabVariants } from "./index.variants";
import { useRecoilState, useSetRecoilState } from "recoil";
import { excelDataActiveTabState, excelDataPageState } from "@/atoms/excelData";

interface ItemProps {
  tabName: "전체" | "완료" | "오류";
  tabValue: number;
}

const Item = ({ tabName, tabValue }: ItemProps) => {
  const [activeTab, setActiveTab] = useRecoilState(excelDataActiveTabState);
  const setCurrentPage = useSetRecoilState(excelDataPageState);

  const handleTabClick = () => {
    setActiveTab(tabName);
    setCurrentPage(1);
  };

  return (
    <button
      type="button"
      className={cn(tabVariants({ isActiveTab: tabName === activeTab, isError: tabName === "오류" }))}
      onClick={handleTabClick}
    >
      {tabName}
      <span className={cn(tabValueVariants({ isError: tabName === "오류" }))}>{tabValue}</span>
    </button>
  );
};

export default Item;
