"use client";

import Icon from "@/components/core/Icon";
import PendingOrder from "@/components/OrderDashBoard/PendingOrderList/PendingOrder/";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";

const PendingOrderList = () => {
  const { isExpanded, toggleExpand } = ToggleExpandSwitch();

  return (
    <div className="max-h-[344px] min-h-[64px] w-[460px] gap-[16px] rounded-[8px] bg-white p-[20px]">
      <div className="inline-flex h-6 w-[420px] flex-col items-start justify-start gap-4 bg-white">
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-gray-900 text-T-18-B">보류주문</span>
              <span className="text-gray-900 text-T-18-B">(3)</span>
            </div>

            <div className="h-[20px] w-[0px] border border-gray-200"></div>

            <button className="flex items-center gap-[4px] text-blue-500 text-B-14-M">
              <Icon id="download" size={14} className="text-blue-500" />
              <span>다운로드</span>
            </button>
          </div>
          <button onClick={toggleExpand}>
            {isExpanded ? <Icon id="arrowUp" size={24} /> : <Icon id="arrowDown" size={24} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="inline-flex max-h-[264px] w-full flex-col items-start justify-start gap-4 overflow-y-auto rounded-lg bg-white pt-[16px] scrollbar-hide">
          <div className="flex w-full flex-col items-start justify-start gap-2.5">
            <PendingOrder address={"nnn시text구text동"} meter={0.016} kilogram={0.111} />
            <PendingOrder address={"nnn시text구te동"} meter={0.016} kilogram={1111} />
            <PendingOrder address={"nnnn시tex구text동"} meter={0.0161} kilogram={1211} />
            <PendingOrder address={"nnn시text구text동"} meter={0.016} kilogram={2222} />
            <PendingOrder address={"nn시text구text동"} meter={0.016} kilogram={3333} />
            <PendingOrder address={"nnn시tex구text동"} meter={0.016} kilogram={4444} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingOrderList;
