import { useState } from "react";
import SearchDate from "./SearchDate";
import SearchCategory from "./SearchCategory";
import SearchTextInput from "./SearchTextInput";
import CheckBox from "@/components/core/CheckBox";
import { DispatchResult } from "@/models/ApiTypes";
import { DispatchNumberApi } from "@/apis/dispatches/dispatchNumber";
import dayjs from "dayjs";

interface SearchBarsProps {
  data: DispatchResult[];
  onSearch: (results: DispatchResult[]) => void;
}

const SearchBars = ({ data, onSearch }: SearchBarsProps) => {
  const [searchCategory, setSearchCategory] = useState("dispatchCode");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleSearch = async () => {
    try {
      const formattedStartDate = startDate ? dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss") : "1900-01-01T00:00:00";
      const formattedEndDate = endDate ? dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss") : "3000-12-31T23:59:59";

      const searchParams = {
        request: {
          status: "IN_TRANSIT" as const, // 'as const'를 추가하여 리터럴 타입으로 지정
          isManager: false,
          startDateTime: formattedStartDate,
          endDateTime: formattedEndDate,
          searchOption: searchKeyword ? searchCategory : "",
          searchKeyword: searchKeyword,
        },
      };

      const { error, results } = await DispatchNumberApi.search(searchParams);

      if (error) {
        console.error("검색 중 오류 발생:", error);
        return;
      }

      onSearch(results as DispatchResult[]); // 검색 결과를 부모 컴포넌트로 전달
    } catch (err) {
      console.error("API 호출 중 오류 발생:", err);
    }
  };

  return (
    <div className="flex items-center gap-[14px]">
      <SearchDate onStartDateChange={(date) => setStartDate(date)} onEndDateChange={(date) => setEndDate(date)} />
      <div className="flex w-fit items-center gap-[12px] rounded-[8px] border border-gray-200 p-[12px] text-T-16-B">
        <SearchCategory onCategoryChange={setSearchCategory} />
        <SearchTextInput onKeywordChange={setSearchKeyword} onSearch={handleSearch} />
      </div>
      <div className="flex gap-[12px] p-[16px] text-SB-14-M">
        <CheckBox label="내 담당 주문만 보기" />
      </div>
    </div>
  );
};

export default SearchBars;
