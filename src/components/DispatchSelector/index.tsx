import DispatchSelectorList from "./DispatchSelectorList";

const DispatchSelector = () => {
  return (
    <div className="flex flex-col items-center gap-[78px] pt-[180px]">
      <div className="flex flex-col gap-3 text-center">
        <h2 className="text-H-28-B">배차방식 선택</h2>
        <p className="text-T-18-M">원하는 배차방식을 선택해주세요.</p>
      </div>
      <DispatchSelectorList />
    </div>
  );
};

export default DispatchSelector;
