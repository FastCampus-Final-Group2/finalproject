import SearchDate from "./SearchDate";
import SearchCategory from "./SearchCategory";
import SearchTextInput from "./SearchTextInput";
import CheckBox from "@/components/core/CheckBox";

const SearchBars = () => {
  return (
    <div className="relative flex items-center gap-[14px]">
      <SearchDate />
      <div className="flex w-fit items-center gap-[12px] rounded-[8px] border border-gray-200 p-[12px] text-T-16-B">
        <SearchCategory />
        <SearchTextInput />
      </div>
      <div className="flex gap-[12px] p-[16px] text-SB-14-M">
        <CheckBox />
        <span className="text-SB-14-M">내 담당 주문만 보기</span>
      </div>
    </div>
  );
};

export default SearchBars;
