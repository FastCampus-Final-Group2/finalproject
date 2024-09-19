import { PENDING_COLOR } from "@/components/NaverMap/index.constants";

interface PendingIconProps {
  index: number | string;
  isSelected: boolean;
}

const PendingIcon = ({ index, isSelected }: PendingIconProps) => {
  return (
    <svg
      width="41"
      height="49"
      viewBox="0 0 41 49"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      className={`${isSelected ? PENDING_COLOR.selected : `${PENDING_COLOR.default} ${PENDING_COLOR.hover}`} group hover:z-50`}
    >
      <path d="M40.1172 21.3461C40.1172 32.6002 31.2283 37.648 20.1172 48.9688C9.13691 37.648 0.117188 32.6002 0.117188 21.3461C0.117188 10.092 9.07149 0.96875 20.1172 0.96875C31.1629 0.96875 40.1172 10.092 40.1172 21.3461Z" />
      <circle cx="20.5" cy="21" r="14.5" fill="white" />
      <text
        x="48%"
        y="45%"
        dominantBaseline="middle"
        textAnchor="middle"
        fontSize="16"
        fontWeight="bold"
        className={`${isSelected ? "text-gray-700" : "text-gray-300 group-hover:text-gray-700"}`}
      >
        {index}
      </text>
    </svg>
  );
};

export default PendingIcon;
