import Icon from "@/components/core/Icon";

const DispatchNameInput = () => {
  return (
    <label className="flex w-[174px] items-center gap-1 px-3 py-[7px]">
      <input
        className="peer max-w-full overflow-x-scroll text-T-18-M scrollbar-hide focus:text-gray-700 [&:not(:placeholder-shown)]:w-fit [&:not(:placeholder-shown)]:max-w-full [&:not(:placeholder-shown)]:text-gray-700 [&:placeholder-shown]:w-[114px]"
        placeholder="배차명 입력하기"
      />
      <Icon
        id="pencil"
        size={16}
        className="cursor-text text-gray-400 peer-focus:text-transparent peer-[&:not(:placeholder-shown)]:hidden"
      />
    </label>
  );
};

export default DispatchNameInput;
