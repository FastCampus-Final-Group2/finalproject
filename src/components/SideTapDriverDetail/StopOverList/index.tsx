"use client";

import Icon from "@/components/core/Icon";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import StopOver from "@/components/SideTapDriverDetail/StopOverList/StopOver";
import StopOverStartCenter from "@/components/SideTapDriverDetail/StopOverList/StopOverStartCenter";

const StopOverList = () => {
  const { isExpanded, toggleExpand } = ToggleExpandSwitch();
  return (
    <div className="inline-flex h-[656px] items-start justify-start gap-[12px] bg-lime-50 px-[32px] pb-[24px]">
      <div className="flex items-start justify-start gap-[12px] self-stretch">
        <div className="inline-flex flex-col items-end justify-start gap-[12px]">
          <div className="inline-flex h-[28px] w-[376px] items-center justify-start gap-[6px]">
            <div className="flex items-center justify-start gap-[4px]">
              <div className="flex items-center justify-start gap-[2px]">
                <div className="text-center text-gray-900 text-T-16-B">오류 주문</div>
                <div className="flex items-center justify-start">
                  <div className="text-center text-red-500 text-T-16-B">3</div>
                  <div className="text-center text-gray-900 text-T-16-B">건</div>
                </div>
              </div>
              <div className="text-center text-gray-900 text-T-16-M">모아보기</div>
              <button onClick={toggleExpand}>
                {isExpanded ? (
                  <Icon id="toggleOn" size={28} className="text-gray-500" />
                ) : (
                  <Icon id="toggleOff" size={28} className="text-gray-500" />
                )}
              </button>
            </div>
            <div className="flex items-center justify-center">
              <div className="flex items-center justify-start">
                <div className="relative h-[28px] w-[28px]" />
              </div>
            </div>
          </div>

          <div className="flex h-[580px] w-[376px] flex-col items-start justify-start overflow-y-auto scrollbar-hide">
            <StopOverStartCenter />
            <StopOver />
            <StopOver />
            <StopOver />
            <StopOver />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopOverList;
