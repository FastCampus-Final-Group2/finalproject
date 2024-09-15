import { useRecoilState } from "recoil";
import {
  controlSearchOptionState,
  searchTextInputState,
  controlOnlyClientState,
  searchStartTimeState,
  searchEndTimeState,
} from "@/atoms/control";
import SearchDate from "./SearchDate";
import SearchOption from "./SearchOption";
import SearchTextInput from "./SearchTextInput";
import CheckBox from "@/components/core/CheckBox";
import dayjs from "dayjs";

interface SearchBarsProps {
  onSearch: () => void;
  onClear: () => void;
  todayDate: string;
  sevenDaysLater: string;
}

const SearchBars = ({ onSearch, onClear, todayDate, sevenDaysLater }: SearchBarsProps) => {
  const [searchOption, setSearchOption] = useRecoilState(controlSearchOptionState);
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchTextInputState);
  const [onlyClient, setOnlyClient] = useRecoilState(controlOnlyClientState);
  const [startDate, setStartDate] = useRecoilState(searchStartTimeState);
  const [endDate, setEndDate] = useRecoilState(searchEndTimeState);

  return (
    <div className="flex items-center gap-[14px]">
      <SearchDate
        startDate={startDate}
        endDate={endDate}
        todayDate={todayDate}
        sevenDaysLater={sevenDaysLater}
        onStartDateChange={(date) => setStartDate(date)}
        onEndDateChange={(date) => setEndDate(date)}
      />
      <div className="flex w-fit items-center gap-[12px] rounded-[8px] border border-gray-200 p-[12px] text-T-16-B">
        <SearchOption selectedOption={searchOption} setSelectedOption={(option) => setSearchOption(option)} />
        <SearchTextInput inputValue={searchKeyword} setInputValue={setSearchKeyword} onSearch={onSearch} />
      </div>
      <div className="flex gap-[12px] p-[16px] text-SB-14-M">
        <CheckBox label="내 담당 주문만 보기" checked={onlyClient} onChange={(e) => setOnlyClient(e.target.checked)} />
      </div>
    </div>
  );
};

export default SearchBars;
