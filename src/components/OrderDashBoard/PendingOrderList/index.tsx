'use client';

import { useState } from 'react';
import Icon from "@/components/core/Icon";
import PendingOrder from '@/components/OrderDashBoard/PendingOrderList/PendingOrder/';

const PendingOrderList = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-[460px] min-h-[64px] max-h-[344px] rounded-[8px] p-[20px] gap-[16px] bg-[#FFFFFF]">
      <div className="w-[420px] h-6 bg-white flex-col justify-start items-start gap-4 inline-flex">
        <div className="w-full flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <span className="text-[#191919] text-T-18-B font-B">보류주문</span>
              <span className="text-[#191919] text-T-18-B font-B">(3)</span>
            </div>

            <div className="text-gray-200 after:content-['|']"></div>

            <button className="flex items-center gap-[4px] text-blue-500 text-B-14-M">
              <Icon id='download' size={14} className="text-blue-500" />
              <span>다운로드</span>
            </button>
          </div>
          <button onClick={toggleExpand}>
            {isExpanded ? <Icon id='arrowUp' size={24} /> : <Icon id='arrowDown' size={24} />}
          </button>
        </div>
      </div>

      {isExpanded && (
        <div className="w-full max-h-[264px] bg-white rounded-lg flex-col justify-start items-start gap-4 inline-flex overflow-y-auto scrollbar-hide pt-[16px]">
          <div className="flex-col justify-start items-start gap-2.5 flex w-full">
            <PendingOrder address={'nnn시text구text동'} meter={0.016} kilogram={'nnn'} />
            <PendingOrder address={'nnn시text구te동'} meter={0.016} kilogram={'nnn'} />
            <PendingOrder address={'nnnn시tex구text동'} meter={0.016} kilogram={'nnn'} />
            <PendingOrder address={'nnn시text구text동'} meter={0.016} kilogram={'nnn'} />
            <PendingOrder address={'nn시text구text동'} meter={0.016} kilogram={'nnn'} />
            <PendingOrder address={'nnn시tex구text동'} meter={0.016} kilogram={'nnn'} />
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingOrderList;
