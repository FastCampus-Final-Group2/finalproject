import DispatchSelectorList from "./DispatchSelectorList";

const DispatchSelector = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-[94px] bg-white px-48 pt-[103px]">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-H-28-B">배차방식 선택</h2>
        <p className="text-T-18-M">원하는 배차방식을 선택해주세요.</p>
      </div>
      <DispatchSelectorList />
    </div>
  );
};

export default DispatchSelector;
