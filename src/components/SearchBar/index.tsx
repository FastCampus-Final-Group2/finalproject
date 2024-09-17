import { useRecoilState, useSetRecoilState } from "recoil";
import {
  controlSearchOptionState,
  searchTextInputState,
  controlOnlyClientState,
  searchStartTimeState,
  searchEndTimeState,
  controlCheckboxState,
  searchParamsState, // searchParamsState를 추가로 import
} from "@/atoms/control";
import SearchDate from "./SearchDate";
import SearchOption from "./SearchOption";
import SearchTextInput from "./SearchTextInput";
import CheckBox from "@/components/core/CheckBox";

// 파일 상단에 타입 정의 추가
interface CheckboxState {
  isManager: boolean;
  // 다른 필요한 속성들...
}

interface SearchBarsProps {
  onSearch: () => void;
  onClear: () => void;
  todayDate: string;
  sevenDaysLater: string;
}

// 파일 상단에 타입 정의 추가
interface SearchParams {
  isManager: boolean;
  searchOption: string;
  searchKeyword: string;
  startDateTime: string;
  endDateTime: string;
}

const SearchBars = ({ onSearch, onClear, todayDate, sevenDaysLater }: SearchBarsProps) => {
  const [searchOption, setSearchOption] = useRecoilState(controlSearchOptionState);
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchTextInputState);
  const [onlyClient, setOnlyClient] = useRecoilState(controlOnlyClientState);
  const [startDate, setStartDate] = useRecoilState(searchStartTimeState);
  const [endDate, setEndDate] = useRecoilState(searchEndTimeState);
  const [checkboxState, setCheckboxState] = useRecoilState<CheckboxState>(controlCheckboxState);
  const setSearchParams = useSetRecoilState<SearchParams>(searchParamsState);

  const handleOnlyClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;
    setOnlyClient(isChecked);
    setCheckboxState((prev: CheckboxState) => ({
      ...prev,
      isManager: isChecked,
    }));
    setSearchParams((prev: SearchParams) => ({ ...prev, isManager: isChecked }));
    onSearch();
  };

  const handleSearchOptionChange = (option: string) => {
    setSearchOption(option);
    setSearchParams((prev) => ({ ...prev, searchOption: option }));
    // onSearch() 호출 제거
  };

  const handleSearchKeywordChange = (keyword: string) => {
    setSearchKeyword(keyword);
    setSearchParams((prev) => ({ ...prev, searchKeyword: keyword }));
  };

  const handleSearch = () => {
    if (searchOption && searchKeyword) {
      onSearch();
    }
  };

  return (
    <div className="flex items-center gap-[14px]">
      <SearchDate
        startDate={startDate}
        endDate={endDate}
        todayDate={todayDate}
        sevenDaysLater={sevenDaysLater}
        onStartDateChange={(date) => {
          setStartDate(date);
          setSearchParams((prev) => ({ ...prev, startDateTime: date }));
        }}
        onEndDateChange={(date) => {
          setEndDate(date);
          setSearchParams((prev) => ({ ...prev, endDateTime: date }));
        }}
        onSearch={onSearch}
      />
      <div className="flex w-fit items-center gap-[12px] rounded-[8px] border border-gray-200 p-[12px] text-T-16-B">
        <SearchOption selectedOption={searchOption} setSelectedOption={handleSearchOptionChange} />
        <SearchTextInput inputValue={searchKeyword} setInputValue={handleSearchKeywordChange} onSearch={handleSearch} />
      </div>
      <div className="flex gap-[12px] p-[16px] text-SB-14-M">
        <CheckBox label="내 담당 주문만 보기" checked={onlyClient} onChange={handleOnlyClientChange} />
      </div>
    </div>
  );
};

export default SearchBars;
