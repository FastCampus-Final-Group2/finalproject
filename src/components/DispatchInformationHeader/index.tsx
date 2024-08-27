import CopyButton from "@/components/core/CopyButton";
import Button from "@/components/core/Button";

const DispatchInformationHeader = () => {
  return (
    <div className="flex h-[92px] w-[1696px] items-center justify-between border-b px-[40px] pb-[24px] pt-[28px]">
      <div className="flex h-[36px] w-[535px] items-center gap-5">
        <div className="flex h-[36px] w-[172px] items-center justify-center gap-[6px] text-[20px] font-B leading-[24px]">
          <span>240808C001#1</span>
          <CopyButton copyString={"240808C001#1"} />
        </div>
        <div className="flex h-[36px] w-[351px] gap-6">
          <div className="flex h-[36px] w-[174px] items-center justify-center leading-[24px] text-T-18-M">
            인플루언서 A 긴급건
          </div>
          <div className="flex h-[36px] w-[116px] items-center justify-center rounded-[4px] bg-gray-100 leading-[24px] text-B-14-M">
            08월08일14:00
          </div>
          <div className="flex h-[36px] w-[41px] items-center justify-center rounded-[4px] bg-gray-700 leading-[24px] text-white text-B-14-B">
            택배
          </div>
        </div>
      </div>
      <div className="flex h-[40px] gap-4">
        <Button
          size="s"
          shape="fill"
          intent="secondary"
          className="h-[41px] bg-gray-100 py-[12px] text-gray-900 text-B-14-B"
        >
          배차 취소
        </Button>
        <Button size="s" shape="fill" intent="primary" className="h-[41px] bg-blue-500 py-[12px] text-14 text-white">
          배차 확정
        </Button>
      </div>
    </div>
  );
};

export default DispatchInformationHeader;
