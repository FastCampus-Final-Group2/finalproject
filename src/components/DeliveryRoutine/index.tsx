import React from "react";
import Icon from "@/components/core/Icon";
import SelectedDelivery from "@/components/SelectedDelivery";
import DeliveryRoutineDetail from "@/components/DeliveryRoutine/DeliveryRoutineDetail";
import DeliveryStopoverListCard from "@/components/DeliveryRoutine/DeliveryStopoverListCard";

const startEnd = [
  { status: "운송 시작", centerName: "마포센터", timetext: "시작", time: "14:00" },
  { status: "운송 종료", centerName: "", timetext: "종료 예정", time: "20:00" },
];

const DeliveryRoutine = () => {
  return (
    <>
      <SelectedDelivery />
      <div className="flex h-[500px] flex-col gap-[6px] py-[8px] text-T-18-B">
        {startEnd.map((data, index) => (
          <React.Fragment key={data.status}>
            <div className="flex h-[60px] w-[430px] justify-between">
              <div className="flex w-[46px] justify-center pt-[18px]">
                <Icon id="circleFill" size={16} className="text-gray-400" />
              </div>
              <DeliveryStopoverListCard border="deliveryStartEnd">
                <ul className="flex items-end gap-[8px]">
                  <li>{data.status}</li>
                  <li className="cursor-pointer border-b border-blue-500 text-blue-500 text-T-16-M">
                    {data.centerName}
                  </li>
                  {/* todo: 마포센터에 모달 달기 */}
                </ul>
                <ul className="flex gap-[4px] text-gray-700 text-B-14-M">
                  <li>{data.timetext}</li>
                  <li>{data.time}</li>
                </ul>
              </DeliveryStopoverListCard>
            </div>
            {/* 운송 시작 다음에 <DeliveryRoutineDetail />가 와야 함*/}
            {index === 0 && <DeliveryRoutineDetail />}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default DeliveryRoutine;
