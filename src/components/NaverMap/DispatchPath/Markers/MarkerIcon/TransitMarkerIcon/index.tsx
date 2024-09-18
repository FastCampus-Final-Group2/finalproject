// interface TransitMarkerProps {
//   color: string;
// }

import { PENDING_COLOR } from "@/components/NaverMap/index.constants";

// const TransitMarkerIcon = ({ color }: TransitMarkerProps) => {
//   return (
//     <svg width="41" height="49" viewBox="0 0 41 49" fill="none" xmlns="http://www.w3.org/2000/svg">
//       <path
//         d="M40.1172 21.3461C40.1172 32.6002 31.2283 37.648 20.1172 48.9688C9.13691 37.648 0.117188 32.6002 0.117188 21.3461C0.117188 10.092 9.07149 0.96875 20.1172 0.96875C31.1629 0.96875 40.1172 10.092 40.1172 21.3461Z"
//         fill={color}
//       />
//     </svg>
//   );
// };

// export default TransitMarkerIcon;

interface TransitMarkerProps {
  color: string;
  index: number | string; // 경유지 번호를 나타내는 속성
  isPending?: boolean;
}

const TransitMarkerIcon = ({ color, index }: TransitMarkerProps) => {
  return (
    <svg
      width="41"
      height="49"
      viewBox="0 0 41 49"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${color} group hover:text-gray-900`}
    >
      {/* 배경 모양 */}
      <path d="M40.1172 21.3461C40.1172 32.6002 31.2283 37.648 20.1172 48.9688C9.13691 37.648 0.117188 32.6002 0.117188 21.3461C0.117188 10.092 9.07149 0.96875 20.1172 0.96875C31.1629 0.96875 40.1172 10.092 40.1172 21.3461Z" />
      {/* 하얀색 동그라미 */}
      <circle
        cx="20.5" // 원의 중심 x좌표
        cy="21" // 원의 중심 y좌표
        r="14.5" // 원의 반지름
        fill="white"
      />
      {/* 텍스트 추가 */}
      <text
        x="48%"
        y="45%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        className="text-gray-900"
      >
        {index}
      </text>
    </svg>
  );
};

export default TransitMarkerIcon;
