import Icon from "@/components/core/Icon";
import useResetControlAtoms from "@/hooks/useResetControlAtoms";

interface SearchTextInputProps {
  inputValue: string;
  setInputValue: (value: string) => void;
  onSearch: () => void;
}

const SearchTextInput = ({ inputValue, setInputValue, onSearch }: SearchTextInputProps) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  const resetControlAtoms = useResetControlAtoms();

  const handleClearInput = () => {
    resetControlAtoms();
  };

  return (
    <div className="flex items-center text-SB-14-M">
      <div className="relative">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyPress}
          placeholder="배차코드, 배차명, 배차담당자명 등을 입력해주세요."
          className="h-[20px] w-[490px] text-SB-14-B focus:bg-blue-50 focus:outline-none"
        />
        <button className="absolute right-[2px] top-[50%] translate-y-[-50%]">
          <Icon
            id="circleCancelFill"
            className={`text-gray-200 hover:text-red-250 ${inputValue ? "opacity-100" : "opacity-0"}`}
            size={20}
            onClick={handleClearInput}
          />
        </button>
      </div>
      <button onClick={onSearch}>
        <Icon id="search" />
      </button>
    </div>
  );
};

export default SearchTextInput;
