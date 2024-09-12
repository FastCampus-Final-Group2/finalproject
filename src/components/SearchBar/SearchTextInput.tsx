import { useRecoilState } from "recoil";
import Icon from "@/components/core/Icon";
import { searchTextInputState } from "@/atoms/control";

interface SearchTextInputProps {
  onSearch: () => void;
}

const SearchTextInput = ({ onSearch }: SearchTextInputProps) => {
  const [inputValue, setInputValue] = useRecoilState(searchTextInputState);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="flex items-center text-SB-14-M">
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="배차코드, 배차명, 배차담당자명 등을 입력해주세요."
        className="h-[20px] w-[490px] text-SB-14-B focus:bg-blue-50 focus:outline-none"
      />
      <button onClick={onSearch}>
        <Icon id="search" />
      </button>
    </div>
  );
};

export default SearchTextInput;
