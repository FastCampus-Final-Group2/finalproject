import Icon from "@/components/core/Icon";

const Driver = ({ checkOrWarning, name, orderCount, kiloMeter, hours, tonCode, capacityRate }) => {
  const checkOrWarningBgColor = checkOrWarning === 'check' ? 'bg-green-50' : 'bg-red-600';
  const checkOrWarningTextColor = checkOrWarning === 'check' ? 'text-green-500' : 'text-white';
  
  let capacityBgColor;
  if (capacityRate > 100) {
    capacityBgColor = 'bg-red-500';
  } else if (capacityRate > 70) {
    capacityBgColor = 'bg-blue-250';
  } else if (capacityRate > 30) {
    capacityBgColor = 'bg-blue-400';
  } else {
    capacityBgColor = 'bg-blue-500';
  }
  


  return (
    <div className="w-[420px] h-[40px] bg-white rounded border border-[#e6e6e6] justify-start items-center inline-flex">
      <div className="grow shrink basis-0 h-10 pl-3 py-1 rounded justify-start items-center gap-1 flex">
        <div className="py-[5px] justify-start items-center gap-3 flex">
          <div className={`p-1 ${checkOrWarningBgColor} rounded-full justify-center items-center flex`}>
            <Icon id={checkOrWarning} size={14} className={checkOrWarningTextColor} />
          </div>
        </div>
        <div className="w-[320px] h-[32px] justify-start items-center gap-2 flex">
          <div className="w-[37px] py-1.5 justify-center items-center gap-[9px] flex">
            <div className="text-[14px] font-B leading-tight">{name}</div>
          </div>
          <div className="text-gray-100 after:content-['|']"></div>
          <div className="w-[140px] h-8 py-1.5 justify-center items-center flex text-[14px]">
            <div className="max-w-6 text-right">{orderCount}</div>
            <div className="text-center">건</div>
            <div>・</div>
            <div className="max-w-7 text-right">{kiloMeter}</div>
            <div className="text-center">km</div>
            <div>・</div>
            <div className="max-w-7 text-right">{hours}</div>
            <div className="text-center">시간</div>
          </div>
          <div className="text-gray-100 after:content-['|']"></div>
          <div className="justify-end items-center gap-2 flex">
            <div className="w-[42px] flex-col justify-center items-center inline-flex">
              <Icon id={tonCode} size={40} />
            </div>
            <div className="w-[46px] flex-col justify-center items-center inline-flex">
              <div className={`self-stretch px-2 py-1 ${capacityBgColor} rounded justify-center items-center gap-1 inline-flex`}>
                <div className="text-center text-white text-sm font-medium font-['Pretendard'] leading-tight">{capacityRate}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="relative group">
        <div className="w-3 h-10 px-[4px] bg-sky-350 rounded-tr rounded-br transition-all duration-300 ease-in-out group-hover:w-[22px] flex items-center group-hover:justify-center">
          <button className="flex items-center justify-center w-full h-full">
            <Icon id="arrowLargeDoubleRight" size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
          </button>
        </div>
      </div>
    </div>
  )
};

export default Driver;