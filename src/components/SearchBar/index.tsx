import SearchDate from "./SearchDate";
import SearchCategory from "./SearchCategory";
import SearchTextInput from "./SearchTextInput";
import CheckBox from "@/components/core/CheckBox";

interface SearchBarsProps {
  data: {
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

const SearchBars = ({ data }: SearchBarsProps) => {
  return (
    <div className="flex items-center gap-[14px]">
      <SearchDate />
      <div className="flex w-fit items-center gap-[12px] rounded-[8px] border border-gray-200 p-[12px] text-T-16-B">
        <SearchCategory />
        <SearchTextInput />
      </div>
      <div className="flex gap-[12px] p-[16px] text-SB-14-M">
        <CheckBox label="내 담당 주문만 보기" />

        {/* <span className="text-SB-14-M"></span> */}
      </div>
    </div>
  );
};

export default SearchBars;
