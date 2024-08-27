import Icon from "@/components/core/Icon";

const StopOver = () => {
  return (
    <div className="inline-flex items-start justify-start gap-[20px] self-stretch">
      <div className="inline-flex flex-col items-center justify-start gap-[12px] self-stretch pt-[12px]">
        <div className="flex h-[24px] w-[24px] flex-col items-center justify-center gap-[12px] rounded-[100px] bg-[#191919]">
          <div className="text-center leading-[14.40px] text-white text-C-12-M">1</div>
        </div>
        <div className="shrink grow basis-0 border-2 border-dashed"></div>
      </div>
      <div className="inline-flex w-[332px] flex-col items-start justify-start">
        <div className="flex h-[116px] w-full flex-col items-start justify-start gap-[12px] rounded-lg bg-white p-[16px]">
          <div className="flex h-[44px] flex-col items-start justify-start gap-[4px] self-stretch">
            <div className="inline-flex items-center justify-start gap-[8px] self-stretch">
              <button className="flex items-center justify-start gap-[4px] border-b border-blue-500 pt-[1px]">
                <div className="text-center text-blue-500 text-T-16-M">서울시</div>
                <div className="text-center text-blue-500 text-T-16-M">마포구</div>
                <div className="text-center text-blue-500 text-T-16-M">신수동</div>
              </button>
              <div className="shrink grow basis-0 text-gray-500 text-B-14-M">448-52</div>
            </div>
            <div className="inline-flex items-center justify-start gap-[4px] self-stretch rounded">
              <Icon id="warning" size={14} className="text-red-500" />
              <div className="text-center text-red-500 text-B-14-M">진입 제한 조건 </div>
            </div>
          </div>
          <div className="inline-flex items-center justify-center gap-[8px]">
            <div className="flex items-center justify-start gap-[4px]">
              <div className="flex items-center justify-center gap-[4px] rounded bg-blue-400 px-[8px] py-[4px]">
                <div className="text-center text-white text-B-14-B">배송</div>
              </div>
              <div className="flex items-center justify-center gap-[4px] rounded bg-gray-100 px-[8px] py-[4px]">
                <Icon id="clock" size={14} className="text-gray-700" />
                <div className="text-center text-gray-700 text-B-14-M">30분</div>
              </div>
            </div>

            <div className="flex h-[28px] items-center justify-end py-[4px]">
              <div className="flex items-center justify-start">
                <div className="text-center text-gray-700 text-B-14-R">14</div>
                <div className="text-center text-gray-700 text-B-14-R">:</div>
                <div className="text-center text-gray-700 text-B-14-R">00</div>
              </div>
              <div className="text-center text-gray-700 text-B-14-R">~</div>
              <div className="flex items-center justify-start">
                <div className="text-center text-gray-700 text-B-14-R">14</div>
                <div className="text-center text-gray-700 text-B-14-R">:</div>
                <div className="text-center text-gray-700 text-B-14-R">30</div>
              </div>
            </div>
          </div>
        </div>
        <div className="inline-flex h-[52px] items-center justify-start gap-[8px] self-stretch bg-[#eefaea] px-[8px] py-[16px]">
          <div className="flex items-center justify-start">
            <div className="text-center text-gray-700 text-B-14-R">12.5</div>
            <div className="text-center text-gray-700 text-B-14-R">km</div>
          </div>
          <div className="h-[0px] w-[12px] rotate-90 border border-gray-200"></div>
          <div className="flex items-center justify-start">
            <div className="text-center text-gray-900 text-B-14-M">48</div>
            <div className="text-center">
              <span className="text-gray-900 text-B-14-R">분 </span>
              <span className="text-gray-700 text-B-14-R">소요예상</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopOver;
