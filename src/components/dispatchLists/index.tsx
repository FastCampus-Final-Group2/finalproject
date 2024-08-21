import Icon from "@/components/core/Icon";
import Lists from "./Lists";

const tableHeader = [
  { text: "진행률", width: "180px" },
  { text: "배차 코드", width: "348px" },
  { text: "상하차 시작 일자", width: "260px" },
  { text: "총 주문", width: "200px" },
  { text: "드라이버 수", width: "200px" },
  { text: "배차 담당자", width: "200px" },
];

const DispatchLists = () => {
  return (
    <>
      <ul className="flex items-center gap-[16px] bg-blue-30 px-[24px] py-[6px] text-gray-900 text-T-16-B">
        <li className="w-[60px]">
          <Icon id="checkBox" />
        </li>
        {tableHeader.map((header, index) => (
          <li key={index} className={`flex items-center px-[12px] py-[8px]`} style={{ width: header.width }}>
            {header.text}
            <span>
              <Icon id="triangleUp" size={14} className="text-gray-300" />
              <Icon id="triangleDown" size={14} className="text-gray-300" />
            </span>
          </li>
        ))}
      </ul>
      <Lists />
    </>
  );
};

export default DispatchLists;
