import { ORDER_VALIDATION_TABLE_TABS } from "@/components/OrderValidation/OrderValidationTable/TabList/index.constants";
import { ObjectValues } from "@/types/util";
import { cn } from "@/utils/cn";
import { tabValueVariants, tabVariants } from "./index.variants";

interface ItemProps {
  tabName: "전체" | "완료" | "오류";
  tabValue: number;
  activeTab: ObjectValues<typeof ORDER_VALIDATION_TABLE_TABS>;
  setActiveTab: React.Dispatch<React.SetStateAction<ObjectValues<typeof ORDER_VALIDATION_TABLE_TABS>>>;
}

const Item = ({ tabName, tabValue, activeTab, setActiveTab }: ItemProps) => {
  return (
    <button
      type="button"
      className={cn(tabVariants({ isActiveTab: tabName === activeTab, isError: tabName === "오류" }))}
      onClick={() => setActiveTab(tabName)}
    >
      {tabName}
      <span className={cn(tabValueVariants({ isError: tabName === "오류" }))}>{tabValue}</span>
    </button>
  );
};

export default Item;
