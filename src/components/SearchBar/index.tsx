import { useState } from "react";
import { useRecoilState } from "recoil";
import { controlSearchOptionState, searchTextInputState, controlOnlyClientState } from "@/atoms/control";
import SearchDate from "./SearchDate";
import SearchOption from "./SearchOption";
import SearchTextInput from "./SearchTextInput";
import CheckBox from "@/components/core/CheckBox";
import { DispatchResult } from "@/models/ApiTypes";
import { DispatchNumberApi } from "@/apis/dispatches/dispatchNumber";
import dayjs from "dayjs";

interface SearchBarsProps {
  data: DispatchResult[];
  onSearch: (results: DispatchResult[]) => void;
}

const SearchBars = ({ onSearch }: SearchBarsProps) => {
  const [searchOption] = useRecoilState(controlSearchOptionState);
  const [searchKeyword, setSearchKeyword] = useRecoilState(searchTextInputState);
  const [onlyClient, setOnlyClient] = useRecoilState(controlOnlyClientState);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = async () => {
    try {
      const formattedStartDate = startDate ? dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss") : "1900-01-01T00:00:00";
      const formattedEndDate = endDate ? dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss") : "3000-12-31T23:59:59";

      const searchParams = {
        request: {
          status: "IN_TRANSIT" as const,
          isManager: false,
          startDateTime: formattedStartDate,
          endDateTime: formattedEndDate,
          searchOption: searchKeyword ? searchOption : "",
          searchKeyword,
          onlyClient,
        },
      };

      const { error, results } = await DispatchNumberApi.search(searchParams);

      if (error) {
        console.error("검색 중 오류 발생:", error);
        return;
      }

      onSearch(results as DispatchResult[]);
    } catch (err) {
      console.error("API 호출 중 오류 발생:", err);
    }
  };

  const handleOnlyClientChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOnlyClient(e.target.checked);
  };

  return (
    <div className="flex items-center gap-[14px]">
      <SearchDate onStartDateChange={setStartDate} onEndDateChange={setEndDate} />
      <div className="flex w-fit items-center gap-[12px] rounded-[8px] border border-gray-200 p-[12px] text-T-16-B">
        <SearchOption />
        <SearchTextInput onSearch={handleSearch} />
      </div>
      <div className="flex gap-[12px] p-[16px] text-SB-14-M">
        <CheckBox label="내 담당 주문만 보기" checked={onlyClient} onChange={handleOnlyClientChange} />
      </div>
    </div>
  );
};

export default SearchBars;
