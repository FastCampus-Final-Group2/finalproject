import CopyButton from "@/components/core/CopyButton";
import Icon from "@/components/core/Icon";

const ControlDiapatchHeader = () => {
  return (
    <div className="flex h-[92px] items-center justify-between border-b px-[40px] pb-[24px] pt-[28px]">
      <ul className="flex items-center gap-[16px]">
        <li className="flex items-center gap-[4px]">
          <p className="text-T-18-B">240808C001#1</p>
          <CopyButton copyString={"240808C001#1"} />
        </li>
        <li className="text-T-18-M">인플루언서 A 긴급건</li>
        <li className="flex gap-[8px]">
          <p className="rounded-[4px] bg-gray-100 p-[8px] text-gray-700 text-B-14-M">2024.08.20</p>
          <p className="rounded-[4px] bg-gray-700 p-[8px] text-white text-B-14-M">택배</p>
        </li>
      </ul>
      <div className="flex items-center gap-[4px]">
        <Icon id="menuKebab" />
        <div className="text-T-16-B">배차목록 보기</div>
      </div>
    </div>
  );
};

export default ControlDiapatchHeader;
