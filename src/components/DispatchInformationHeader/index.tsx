import CopyButton from "@/components/core/CopyButton";

const DispatchInformationHeader = () => {

  return (
    <div className="flex justify-between items-center w-[1696px] h-[92px] px-[40px] pt-[28px] pb-[24px] border-b">
      <div className="flex items-center gap-5 w-[535px] h-[36px]">
        <div className="flex items-center justify-center w-[172px] h-[36px] font-pretendard text-[20px] font-bold leading-[24px]">
          <span>240808C001#1</span>
          <CopyButton />
        </div>
        <div className="flex gap-6 w-[351px] h-[36px]">
          <div className="flex items-center justify-center w-[174px] h-[36px] font-pretendard text-[18px] font-bold leading-[24px]">
            인플루언서 A 긴급건
          </div>
          <div className="flex items-center justify-center w-[116px] h-[36px] bg-[#E6E6E6] font-pretendard text-[14px] font-bold leading-[24px]">
            08월 08일 14:00
          </div>
          <div className="flex items-center justify-center w-[41px] h-[36px] bg-[#4D4D4D] text-[#FFFFFF] font-pretendard text-[14px] font-bold leading-[24px]">
            택배
          </div>
        </div>
      </div>
      <div className="flex gap-4 w-[164px] h-[40px]">
        <button className="flex items-center justify-center w-[76px] h-[40px] bg-white hover:bg-[#CCCCCC] text-black rounded-md">
          배차 취소
        </button>
        <button className="flex items-center justify-center w-[76px] h-[40px] bg-blue-500 text-white border border-blue-500 rounded-md">
          배차 확정
        </button>
      </div>
    </div>
  );
};

export default DispatchInformationHeader;
