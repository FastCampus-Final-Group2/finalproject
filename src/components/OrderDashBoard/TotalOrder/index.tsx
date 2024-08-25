import Icon from "@/components/core/Icon";
import CircularProgressBar from "@/components/core/CircularProgressBar";

// const CircularProgressBar = ({ percentage }) => {
//   const radius = 30; // 반지름
//   const stroke = 4; // 두께
//   const normalizedRadius = radius - stroke * 2;
//   const circumference = normalizedRadius * 2 * Math.PI;
//   const strokeDashoffset = circumference - (percentage / 100) * circumference;

//   return (
//     // <svg
//     //   height={radius * 2}
//     //   width={radius * 2}
//     //   className="transform -rotate-90"
//     // >
//     //   <circle
//     //     className="text-blue-50"
//     //     stroke="currentColor"
//     //     fill="transparent"
//     //     strokeWidth={stroke}
//     //     r={normalizedRadius}
//     //     cx={radius}
//     //     cy={radius}
//     //   />
//     //   <circle
//     //     className="text-blue-500"
//     //     stroke="currentColor"
//     //     fill="transparent"
//     //     strokeWidth={stroke}
//     //     strokeDasharray={circumference + ' ' + circumference}
//     //     style={{ strokeDashoffset }}
//     //     r={normalizedRadius}
//     //     cx={radius}
//     //     cy={radius}
//     //   />
//     // </svg>
    

//     <div className="w-[101px] h-[60px] justify-start items-start gap-1 inline-flex">
//       <div className="w-[37px] h-[20px] text-[#808080] text-14">용적률</div>
//       <div className="w-[60px] h-[60px] relative">
//         <svg
//           height={radius * 2}
//           width={radius * 2}
//           className="transform -rotate-90"
//         >
//           <circle
//             className="text-blue-50"
//             stroke="currentColor"
//             fill="transparent"
//             strokeWidth={stroke}
//             r={normalizedRadius}
//             cx={radius}
//             cy={radius}
//           />
//           <circle
//             className="text-blue-500"
//             stroke="currentColor"
//             fill="transparent"
//             strokeWidth={stroke}
//             strokeDasharray={circumference + ' ' + circumference}
//             style={{ strokeDashoffset }}
//             r={normalizedRadius}
//             cx={radius}
//             cy={radius}
//           />
//         </svg>
//         <div className="absolute inset-0 flex justify-center items-center">
//           <div className="w-[24px] h-[22px] text-gray-900 text-T-18-B">{percentage}</div>
//           <div className="w-[14px] h-[20px] text-gray-900 text-B-14-B">%</div>
//         </div>
//       </div>
//     </div>
//   );
// };

const TotalOrder = ({ totalOrders, errorOrders, estimatedTime, capacityRate} ) => {
  return (
    <div className="w-[460px] h-[116px] pl-6 pr-[23px] py-4 bg-white rounded-lg justify-center items-center gap-4 inline-flex">
      <div className="w-[413px] h-[84px] justify-between items-center gap-4 flex">
        {/* 총 주문 */}
        <div className="w-[56px] h-[44px] flex flex-col justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <Icon id="order" size={14} className="text-gray-500" />
            <div className="w-[40px] h-[20px] text-gray-500 text-14">총 주문</div>
          </div>
          <div className="w-[56px] h-[44px] flex justify-end items-center text-right ">
            <div className="text-blue-500 text-T-20-B">{totalOrders}</div>
            <div className="text-gray-700 text-T-16-B">건</div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="after:content-['|'] text-gray-500"></div>

        {/* 오류 주문 */}
        <div className="w-[68px] h-[44px] flex flex-col justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <Icon id="warning" size={14} className="text-gray-500" />
            <div className="w-[52px] h-[20px] text-gray-500 text-14">오류 주문</div>
          </div>
          <div className="w-[68px] h-[44px] flex justify-end items-center text-right">
            <div className="text-red-500 text-T-20-B">{errorOrders}</div>
            <div className="text-gray-700 text-T-16-B">건</div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="after:content-['|'] text-gray-500"></div>

        {/* 예상 시간 */}
        <div className="w-[68px] h-[44px] flex flex-col justify-between items-center">
          <div className="flex justify-center items-center gap-2">
            <Icon id="clock" size={14} className="text-gray-500" />
            <div className="w-[52px] h-[20px] text-gray-500 text-14">예상 시간</div>
          </div>
          <div className="w-[68px] h-[44px] flex justify-end items-center text-right">
            <div className="text-blue-500 text-T-20-B">{estimatedTime}</div>
            <div className="text-gray-700 text-T-16-B">시간</div>
          </div>
        </div>

        {/* 구분선 */}
        <div className="after:content-['|'] text-[#808080]"></div>

        {/* 용적률 */}
        {/* <div className="w-[101px] h-[60px] justify-start items-start gap-1 inline-flex">
          <div className="w-[37px] h-[20px] text-[#808080] text-14">용적률</div>
          <div className="w-[60px] h-[60px] relative">
            <CircularProgressBar percentage={capacityRate} />
            <div className="absolute inset-0 flex justify-center items-center">
              <div className="w-[24px] h-[22px] text-gray-900 text-T-18-B">{capacityRate}</div>
              <div className="w-[14px] h-[20px] text-gray-900 text-B-14-B">%</div>
            </div>
          </div>
        </div> */}
        <CircularProgressBar percentage={capacityRate} color={'blue'}/>
      </div>
    </div>

  );
};

export default TotalOrder;
