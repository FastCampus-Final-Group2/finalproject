import Icon from "@/components/core/Icon";

const SearchTextInput = () => {
  return (
    <>
      <div className="flex text-SB-14-M">
        <input type="text" className="h-[20px] w-[490px] text-SB-14-B focus:bg-blue-50 focus:outline-none" />
        <Icon id="search" />
      </div>
    </>
  );
};

export default SearchTextInput;
