import { useState } from "react";
import Icon from "@/components/core/Icon";

interface SearchTextInputProps {
  onKeywordChange: (keyword: string) => void;
  onSearch: () => void;
}

const SearchTextInput = ({ onKeywordChange, onSearch }: SearchTextInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onKeywordChange(e.target.value);
  };

  const handleSearch = () => {
    onSearch();
  };

  return (
    <>
      <div className="flex items-center text-SB-14-M">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="배차코드, 배차명, 배차담당자명 등을 입력해주세요."
          className="h-[20px] w-[490px] text-SB-14-B focus:bg-blue-50 focus:outline-none"
        />
        <button onClick={handleSearch}>
          <Icon id="search" />
        </button>
      </div>
    </>
  );
};

export default SearchTextInput;
