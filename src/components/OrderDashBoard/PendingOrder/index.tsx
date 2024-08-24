// const PendingOrder = () => {
//   return (
//     <div className="w-[460px] min-h-[64px] border rounded-[8px] flex items-center justify-between">
//       <span>보류주문 (0)</span>
//       <a href="#" className="text-blue-600">다운로드</a>
//     </div>
//   );
// };

// export default PendingOrder;
'use client';

import { useState } from 'react';
import Icon from "@/components/core/Icon";

const PendingOrder = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-[460px] border rounded-[8px] p-[20px] gap-[16px] bg-[#FFFFFF]">
      <div className="flex justify-between mb-2">
        <span className="font-bold">보류주문 (0)</span>
        <div className="after:content-['|']"></div>
        <button className='flex'>
          <Icon id='circleCheck'size={20} />
          <a href="#" className="text-blue-600">다운로드</a>          
        </button>

        <button
          onClick={toggleExpand}
          className="text-blue-600 font-semibold"
        >
          {isExpanded ? <Icon id='arrowUp'size={24} /> : <Icon id='arrowDown'size={24} />}
        </button>
      </div>
      {isExpanded && (
        <div className="flex items-center justify-between min-h-[64px]">
          <span>보류주문이 없습니다.</span>
        </div>
      )}
    </div>
  );
};

export default PendingOrder;
