const PendingOrder = ({ address, meter, kilogram }) => {
  return (
    <div className="h-[36px] self-stretch pl-[12px] py-[2px] bg-white rounded justify-start items-center inline-flex">
      <div className="py-[6px] justify-start items-center gap-[12px] flex">
        <div className="w-[24px] h-[24px] bg-[#4d4d4d] rounded-[100px] flex-col justify-center items-center gap-[12px] inline-flex">
          <div className="text-center text-white text-12 font-B leading-[14.40px]">A</div>
        </div>
      </div>
      <div className="justify-start items-center gap-[14px] flex">
        <div className="px-2 py-1.5 justify-start items-center gap-2 flex">
          <div className="w-[113px] py-0.5 justify-center items-center flex">
            <div className="text-gray-900 text-B-14-R">{address}</div>
            {/* <div className="text-gray-900 text-B-14-R">시</div>
            <div className="text-gray-900 text-B-14-R">text</div>
            <div className="text-gray-900 text-B-14-R">구</div>
            <div className="text-gray-900 text-B-14-R">text</div>
            <div className="text-gray-900 text-B-14-R">동</div> */}
          </div>
          <div className="text-gray-200 after:content-['|']"></div>
          <div className="justify-start items-center flex">
            <div className="py-0.5 justify-center items-center flex">
              <div className="w-[35px] text-[#4d4d4d] text-B-14-R">{meter}</div>
              <div className="text-[#4d4d4d] text-B-14-R">㎥</div>
            </div>
            <div className="text-[#191919] text-B-14-R">・</div>
            <div className="py-0.5 justify-center items-center flex">
              <div className="text-gray-900 text-B-14-R leading-[16.80px]">{kilogram}</div>
              <div className="text-[#4d4d4d] text-B-14-R leading-[16.80px]">kg</div>
            </div>
          </div>
        </div>
        <div className="p-2 bg-[#e6e6e6] rounded justify-start items-center flex">
          <div className="justify-start items-center flex">
            <div className="text-[#4d4d4d] text-B-14-M">08</div>
            <div className="text-[#4d4d4d] text-B-14-M">월</div>
            <div className="text-[#4d4d4d] text-B-14-M">08</div>
            <div className="text-[#4d4d4d] text-B-14-M">일</div>
          </div>
          <div className="justify-start items-center flex">
            <div className="text-[#4d4d4d] text-B-14-M">14</div>
            <div className="text-[#4d4d4d] text-B-14-M">:</div>
            <div className="text-[#4d4d4d] text-B-14-M">00</div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default PendingOrder;