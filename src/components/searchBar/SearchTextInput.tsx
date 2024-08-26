import Icon from "@/components/core/Icon";

const SearchTextInput = () => {
  return (
    <>
      <div className="flex items-center text-SB-14-M">
        <input
          type="text"
          placeholder="배차코드, 배차명, 배차담당자명 등을 입력해주세요."
          className="h-[20px] w-[490px] text-SB-14-B focus:bg-blue-50 focus:outline-none"
        />
        <Icon id="search" />
      </div>
    </>
  );
};

export default SearchTextInput;
