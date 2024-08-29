// "use client";

// import Icon from "@/components/core/Icon";
// import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
// import StopOver from "@/components/SideTapDriverDetail/StopOverList/StopOver";
// import StopOverStartCenter from "@/components/SideTapDriverDetail/StopOverList/StopOverStartCenter";

// const StopOverList = () => {
//   const { isExpanded, toggleExpand } = ToggleExpandSwitch();
//   return (
//     <div className="inline-flex h-[656px] items-start justify-start gap-[12px] bg-lime-50 px-[32px] pb-[24px]">
//       <div className="flex items-start justify-start gap-[12px] self-stretch">
//         <div className="inline-flex flex-col items-end justify-start gap-[12px]">
//           <div className="inline-flex h-[28px] w-[376px] items-center justify-start gap-[6px]">
//             <div className="flex items-center justify-start gap-[4px]">
//               <div className="flex items-center justify-start gap-[2px]">
//                 <div className="text-center text-gray-900 text-T-16-B">오류 주문</div>
//                 <div className="flex items-center justify-start">
//                   <div className="text-center text-red-500 text-T-16-B">3</div>
//                   <div className="text-center text-gray-900 text-T-16-B">건</div>
//                 </div>
//               </div>
//               <div className="text-center text-gray-900 text-T-16-M">모아보기</div>
//               <button onClick={toggleExpand}>
//                 {isExpanded ? (
//                   <Icon id="toggleOn" size={28} className="text-gray-500" />
//                 ) : (
//                   <Icon id="toggleOff" size={28} className="text-gray-500" />
//                 )}
//               </button>
//             </div>
//             <div className="flex items-center justify-center">
//               <div className="flex items-center justify-start">
//                 <div className="relative h-[28px] w-[28px]" />
//               </div>
//             </div>
//           </div>

//           <div className="flex h-[580px] w-[376px] flex-col items-start justify-start overflow-y-auto scrollbar-hide">
//             <StopOverStartCenter />
//             <StopOver warningCheck={true} errorMessage="진입 제한 조건" />
//             <StopOver warningCheck={false} errorMessage="" />
//             <StopOver warningCheck={true} errorMessage="작업희망일 미준수" />
//             <StopOver warningCheck={false} errorMessage="" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default StopOverList;

"use client";

import { useState, useEffect, useMemo } from "react";
import Icon from "@/components/core/Icon";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import StopOver from "@/components/SideTapDriverDetail/StopOverList/StopOver";
import StopOverStartCenter from "@/components/SideTapDriverDetail/StopOverList/StopOverStartCenter";
import { BG_50 } from "@/styles/smColor";

export interface ColorProps {
  bgColor: keyof typeof BG_50;
}

const StopOverList = ({ bgColor }: ColorProps) => {
  const { isExpanded, toggleExpand } = ToggleExpandSwitch();

  // StopOver 컴포넌트의 warningCheck 상태를 관리
  const stopOverData = useMemo(
    () => [
      { id: 1, warningCheck: true, errorMessage: "진입 제한 조건" },
      { id: 2, warningCheck: false, errorMessage: "" },
      { id: 3, warningCheck: true, errorMessage: "작업희망일 미준수" },
      { id: 4, warningCheck: false, errorMessage: "" },
      { id: 5, warningCheck: true, errorMessage: "작업희망일 미준수" },
    ],
    [],
  );

  useEffect(() => {
    // Your effect logic here
  }, [stopOverData]);

  // warningCheck가 true인 StopOver 컴포넌트의 수를 계산
  const [errorCount, setErrorCount] = useState(0);

  useEffect(() => {
    const count = stopOverData.filter((stopOver) => stopOver.warningCheck).length;
    setErrorCount(count);
  }, [stopOverData]);

  return (
    <div className={`inline-flex h-[656px] items-start justify-start gap-[12px] ${BG_50[bgColor]} px-[32px] pb-[24px]`}>
      <div className="flex items-start justify-start gap-[12px] self-stretch">
        <div className="inline-flex flex-col items-end justify-start gap-[12px]">
          <div className="inline-flex h-[28px] w-[376px] items-center justify-start gap-[6px]">
            <div className="flex items-center justify-start gap-[4px]">
              <div className="flex items-center justify-start gap-[2px]">
                <div className="text-center text-gray-900 text-T-16-B">오류 주문</div>
                <div className="flex items-center justify-start">
                  <div className="text-center text-red-500 text-T-16-B">{errorCount}</div>
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
            {isExpanded ? (
              <>
                <StopOverStartCenter bgColor={bgColor} />
                {stopOverData
                  .filter((stopOver) => stopOver.warningCheck)
                  .map((stopOver) => (
                    <StopOver
                      key={stopOver.id}
                      warningCheck={stopOver.warningCheck}
                      errorMessage={stopOver.errorMessage}
                      bgColor={bgColor}
                    />
                  ))}
              </>
            ) : (
              <>
                {stopOverData.map((stopOver) => (
                  <StopOver
                    key={stopOver.id}
                    warningCheck={stopOver.warningCheck}
                    errorMessage={stopOver.errorMessage}
                    bgColor={bgColor}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StopOverList;
