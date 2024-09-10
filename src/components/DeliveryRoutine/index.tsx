import React, { useState } from "react";
import Icon from "@/components/core/Icon";
import SelectedDelivery from "@/components/SelectedDelivery";
import DeliveryRoutineDetail, {
  DeliveryRoutineDetailStatusItem,
} from "@/components/DeliveryRoutine/DeliveryRoutineDetail";
import DeliveryStopoverListCard from "@/components/DeliveryRoutine/DeliveryStopoverListCard";
import { CourseDetailResponse } from "@/models/ApiTypes";

interface FetchData extends CourseDetailResponse {
  startStopover: {
    centerName: string;
    departureTime: string;
  };
  dispatchDetailList: DeliveryRoutineDetailStatusItem[];
  ett?: number;
}

const formatTime = (dateTimeString: string): string => {
  const date = new Date(dateTimeString);
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
};

const DeliveryRoutine = ({ fetchData }: { fetchData: FetchData }) => {
  // todo: 운송 종료 데이터 나중에 추가하기
  const startEnd = [
    {
      status: "운송 시작",
      centerName: fetchData.startStopover?.centerName,
      timetext: "시작",
      time: fetchData.startStopover?.departureTime ? formatTime(fetchData.startStopover.departureTime) : "",
    },
    { status: "운송 종료", centerName: "", timetext: "종료 예정", time: "20:00" },
  ];
  const [selectedOrders, setSelectedOrders] = useState<DeliveryRoutineDetailStatusItem[]>([]);

  return (
    <>
      <SelectedDelivery selectedOrders={selectedOrders} />
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
                </ul>
                <ul className="flex gap-[4px] text-gray-700 text-B-14-M">
                  <li>{data.timetext}</li>
                  <li>{data.time}</li>
                </ul>
              </DeliveryStopoverListCard>
            </div>
            {index === 0 && (
              <DeliveryRoutineDetail
                selectedOrders={selectedOrders}
                setSelectedOrders={setSelectedOrders}
                fetchData={fetchData}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </>
  );
};

export default DeliveryRoutine;
