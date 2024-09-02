import RestrictedTonCodeButtons from "./RestrictedTonCodeButtons";

const RestrictedTonCodeInput = () => {
  return (
    <div className="flex w-full gap-4">
      <div className="flex h-9 w-[125px] items-center py-2 pl-2.5 text-gray-900 text-T-16-B">진입제약 차량</div>
      <div className="flex flex-col gap-4 py-2">
        <RestrictedTonCodeButtons carModel="윙바디" />
        <div className="h-[1px] bg-gray-100" />
        <RestrictedTonCodeButtons carModel="탑차" />
        <div className="h-[1px] bg-gray-100" />
        <RestrictedTonCodeButtons carModel="카고" />
      </div>
    </div>
  );
};

export default RestrictedTonCodeInput;
