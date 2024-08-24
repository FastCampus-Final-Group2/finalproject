'use client';

import { useState } from 'react';
import Icon from "@/components/core/Icon";

const DriverList = () => {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className="w-[460px] border rounded-[8px] p-[20px] gap-[16px] bg-[#FFFFFF]">
      <div className="flex justify-between mb-2">
        <div className="font-B">기사 (10)</div>
        <button
          onClick={toggleExpand}
          className="text-blue-600 font-semibold"
        >
          {isExpanded ? <Icon id='arrowUp'size={24} /> : <Icon id='arrowDown'size={24} />}
        </button>
      </div>
      {isExpanded && (
        <div className="max-h-[264px] flex flex-col gap-2 overflow-y-auto scrollbar-hide">
          <div className="h-[40px] flex items-center justify-between p-2 rounded border text-[14px] relative">
            <div className='w-[22px]'>
              <Icon id='circleCheck'size={20} className='text-green-500 bg-green-50 rounded-full' />              
            </div>
            <div className='flex w-[315px] items-center content-between gap-[6px] border'>
              <div className='font-B'>기사1</div>
              <div className="text-gray-100 after:content-['|']"></div>
              <div>13건</div>
              <div className="after:content-['・']"></div>
              <div>34km</div>
              <div className="after:content-['・']"></div>
              <div>8시간</div>
              <div className="text-gray-100 after:content-['|']"></div>
              <Icon id='wing_3.5T'size={40} />
              <div className="w-[46px] h-[28px] text-[14px] flex items-center justify-center text-white bg-blue-250 rounded-md">90%</div>
            </div>
            
            <div className='w-[12px] h-[40px] bg-green-500 rounded-r absolute right-0'></div>
          </div>



          <div className="w-[420px] h-10 bg-white rounded border border-[#e6e6e6] justify-start items-center inline-flex">
            <div className="grow shrink basis-0 h-10 pl-3 py-1 rounded justify-start items-center gap-1 flex">
              <div className="py-[5px] justify-start items-center gap-3 flex">
                <div className="p-1 bg-[#e8fcef] rounded-[71.43px] justify-center items-center flex">
                  <Icon id="circleCheck" size={14} className="text-green-500" />
                </div>
              </div>
              <div className="w-[320px] h-[32px] justify-start items-center gap-2 flex">
                <div className="w-[37px] py-1.5 justify-center items-center gap-[9px] flex">
                  <div className="text-[14px] font-B leading-tight">김기사</div>
                </div>
                <div className="text-gray-100 after:content-['|']"></div>
                <div className="w-[142px] h-8 py-1.5 justify-center items-center flex text-[14px]">
                  <div className="max-w-6 text-right>">13</div>
                  <div className="text-center>">건</div>
                  <div>・</div>
                  <div className="max-w-7 text-right>">34</div>
                  <div className="text-center>">km</div>
                  <div>・</div>
                  <div className="max-w-7 text-right">8</div>
                  <div className=">">시간</div>
                </div>
                <div className="text-gray-100 after:content-['|']"></div>
                <div className="justify-end items-center gap-2 flex">
                  <div className="w-[42px] flex-col justify-center items-center inline-flex">
                    <Icon id="wing_3.5T" size={40} />
                  </div>
                  <div className="w-[46px] flex-col justify-center items-center inline-flex">
                    <div className="self-stretch px-2 py-1 bg-[#93a7eb] rounded justify-center items-center gap-1 inline-flex">
                      <div className="text-center text-white text-sm font-medium font-['Pretendard'] leading-tight">90%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="w-3 h-10 px-2 bg-[#70c8dc] rounded-tr rounded-br" />
          </div>

          
          <div className="w-[420px] h-10 bg-white rounded border border-[#e6e6e6] justify-start items-center inline-flex">
            <div className="grow shrink basis-0 h-10 pl-3 py-1 rounded justify-start items-center gap-1 flex">
              <div className="py-[5px] justify-start items-center gap-3 flex">
                <div className="p-1 bg-green-50 rounded-full justify-center items-center flex">
                  <Icon id="check" size={14} className="text-green-500" />
                </div>
              </div>
              <div className="w-[320px] h-[32px] justify-start items-center gap-2 flex">
                <div className="w-[37px] py-1.5 justify-center items-center gap-[9px] flex">
                  <div className="text-[14px] font-B leading-tight">김기사</div>
                </div>
                <div className="text-gray-100 after:content-['|']"></div>
                <div className="w-[140px] h-8 py-1.5 justify-center items-center flex text-[14px]">
                  <div className="max-w-6 text-right">130</div>
                  <div className="text-center">건</div>
                  <div>・</div>
                  <div className="max-w-7 text-right">340</div>
                  <div className="text-center">km</div>
                  <div>・</div>
                  <div className="max-w-7 text-right">8</div>
                  <div className="text-center">시간</div>
                </div>
                <div className="text-gray-100 after:content-['|']"></div>
                <div className="justify-end items-center gap-2 flex">
                  <div className="w-[42px] flex-col justify-center items-center inline-flex">
                    <Icon id="wing_3.5T" size={40} />
                  </div>
                  <div className="w-[46px] flex-col justify-center items-center inline-flex">
                    <div className="self-stretch px-2 py-1 bg-[#93a7eb] rounded justify-center items-center gap-1 inline-flex">
                      <div className="text-center text-white text-sm font-medium font-['Pretendard'] leading-tight">90%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="w-3 h-10 px-[4px] bg-[#70c8dc] rounded-tr rounded-br transition-all duration-300 ease-in-out group-hover:w-[22px] flex items-center group-hover:justify-center">
                <button className="flex items-center justify-center w-full h-full">
                  <Icon id="arrowLargeDoubleRight" size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                </button>
              </div>
            </div>
          </div>




          <div className="w-[420px] h-10 bg-white rounded border border-[#e6e6e6] justify-start items-center inline-flex">
            <div className="grow shrink basis-0 h-10 pl-3 py-1 rounded justify-start items-center gap-1 flex">
              <div className="py-[5px] justify-start items-center gap-3 flex">
                <div className="p-1 bg-red-600 rounded-full justify-center items-center flex">
                  <Icon id="warning" size={14} className="text-white" />
                </div>
              </div>
              <div className="w-[320px] h-[32px] justify-start items-center gap-2 flex">
                <div className="w-[37px] py-1.5 justify-center items-center gap-[9px] flex">
                  <div className="text-[14px] font-B leading-tight">김기사</div>
                </div>
                <div className="text-gray-100 after:content-['|']"></div>
                <div className="w-[140px] h-8 py-1.5 justify-center items-center flex text-[14px]">
                  <div className="max-w-6 text-right">130</div>
                  <div className="text-center">건</div>
                  <div>・</div>
                  <div className="max-w-7 text-right">340</div>
                  <div className="text-center">km</div>
                  <div>・</div>
                  <div className="max-w-7 text-right">8</div>
                  <div className="text-center">시간</div>
                </div>
                <div className="text-gray-100 after:content-['|']"></div>
                <div className="justify-end items-center gap-2 flex">
                  <div className="w-[42px] flex-col justify-center items-center inline-flex">
                    <Icon id="wing_3.5T" size={40} />
                  </div>
                  <div className="w-[46px] flex-col justify-center items-center inline-flex">
                    <div className="self-stretch px-2 py-1 bg-[#93a7eb] rounded justify-center items-center gap-1 inline-flex">
                      <div className="text-center text-white text-sm font-medium font-['Pretendard'] leading-tight">90%</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="w-3 h-10 px-[4px] bg-[#70c8dc] rounded-tr rounded-br transition-all duration-300 ease-in-out group-hover:w-[22px] flex items-center group-hover:justify-center">
                <button className="flex items-center justify-center w-full h-full">
                  <Icon id="arrowLargeDoubleRight" size={14} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out" />
                </button>
              </div>
            </div>
          </div>


          {/* 추가 기사 목록 */}
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <div>기사6</div>
            <div className="text-blue-600">78%</div>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <div>기사7</div>
            <div className="text-blue-600">45%</div>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <div>기사8</div>
            <div className="text-blue-600">62%</div>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <div>기사9</div>
            <div className="text-blue-600">88%</div>
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-100 rounded">
            <div>기사10</div>
            <div className="text-blue-600">34%</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DriverList;