interface PendingOrderProps {
  address: string;
  meter: number;
  kilogram: number;
}
const PendingOrder = ({ address, meter, kilogram }: PendingOrderProps) => {
  return (
    <div className="inline-flex h-[36px] items-center justify-start self-stretch rounded bg-white py-[2px] pl-[12px]">
      <div className="flex items-center justify-start gap-[12px] py-[6px]">
        <div className="inline-flex h-[24px] w-[24px] flex-col items-center justify-center gap-[12px] rounded-[100px] bg-gray-700">
          <div className="text-center text-12 font-B leading-[14.40px] text-white">A</div>
        </div>
      </div>
      <div className="flex items-center justify-start gap-[14px]">
        <div className="flex items-center justify-start gap-2 px-2 py-1.5">
          <div className="flex w-[113px] items-center justify-center py-0.5">
            <div className="truncate text-gray-900 text-B-14-R">{address}</div>
          </div>
          <div className="h-[20px] w-[0px] border border-gray-200"></div>
          <div className="flex w-[108px] items-center justify-start">
            <div className="flex items-center justify-center py-0.5">
              <div className="min-w-[35px] text-gray-700 text-B-14-R">{meter}</div>
              <div className="text-gray-700 text-B-14-R">㎥</div>
            </div>
            <div className="text-gray-900 text-B-14-R">・</div>
            <div className="flex items-center justify-center py-0.5">
              <div className="min-w-[24px] leading-[16.80px] text-gray-900 text-B-14-R">{kilogram}</div>
              <div className="leading-[16.80px] text-gray-700 text-B-14-R">kg</div>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-start rounded bg-gray-100 p-2">
          <div className="flex items-center justify-start">
            <div className="text-gray-700 text-B-14-M">08</div>
            <div className="text-gray-700 text-B-14-M">월</div>
            <div className="text-gray-700 text-B-14-M">08</div>
            <div className="text-gray-700 text-B-14-M">일</div>
          </div>
          <div className="flex items-center justify-start">
            <div className="text-gray-700 text-B-14-M">14</div>
            <div className="text-gray-700 text-B-14-M">:</div>
            <div className="text-gray-700 text-B-14-M">00</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingOrder;
