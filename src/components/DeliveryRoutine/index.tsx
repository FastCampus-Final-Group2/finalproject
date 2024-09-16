import React, { useState, useEffect } from "react";
import Icon from "@/components/core/Icon";
import SelectedDelivery from "@/components/SelectedDelivery";
import DeliveryRoutineDetail, {
  DeliveryRoutineDetailStatusItem,
} from "@/components/DeliveryRoutine/DeliveryRoutineDetail";
import DeliveryStopoverListCard from "@/components/DeliveryRoutine/DeliveryStopoverListCard";
import { CourseDetailResponse, LocalTime } from "@/models/ApiTypes";
import DeliveryModal from "@/components/detailModal/DeliveryModal";

interface FetchRoutineData extends CourseDetailResponse {
  startStopover: {
    centerName: string;
    departureTime: LocalTime;
    centerId: number;
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

interface DeliveryRoutineProps {
  fetchData: FetchRoutineData;
  refreshDashboardData: () => Promise<void>;
  refreshSideTabData: () => Promise<void>;
  selectedDestinationId: number | null;
}

const DeliveryRoutine = ({
  fetchData,
  refreshDashboardData,
  refreshSideTabData,
  selectedDestinationId,
}: DeliveryRoutineProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };
  // todo: 운송 종료 데이터 나중에 추가하기
  const startEnd = [
    {
      status: "운송 시작",
      centerName: fetchData.startStopover?.centerName,
      timetext: "시작",
      time: fetchData.startStopover?.departureTime ? formatTime(fetchData.startStopover.departureTime.toString()) : "",
    },
    { status: "운송 종료", centerName: "", timetext: "종료 예정", time: "20:00" },
  ];
  const [selectedOrders, setSelectedOrders] = useState<DeliveryRoutineDetailStatusItem[]>([]);

  const handleRefreshData = async () => {
    await refreshSideTabData();
    setSelectedOrders([]); // refreshData 후 selectedOrders 초기화
  };

  return (
    <>
      <SelectedDelivery
        selectedOrders={selectedOrders}
        refreshSideTabData={handleRefreshData}
        refreshDashboardData={refreshDashboardData}
        resetSelectedOrders={() => setSelectedOrders([])}
      />
      <div className="flex h-fit max-h-[500px] flex-col gap-[6px] py-[8px] text-T-18-B">
        {startEnd.map((data, index) => (
          <React.Fragment key={data.status}>
            <div className="flex justify-between">
              <div className="flex w-[46px] justify-center pt-[18px]">
                <Icon id="circleFill" size={16} className="text-gray-400" />
              </div>
              <DeliveryStopoverListCard border="deliveryStartEnd">
                <ul className="flex items-end gap-[8px]">
                  <li>{data.status}</li>
                  <li
                    className="cursor-pointer border-b border-blue-500 text-blue-500 text-T-16-M"
                    onClick={handleModalOpen}
                  >
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
                selectedDestinationId={selectedDestinationId}
                refreshSideTabData={handleRefreshData}
              />
            )}
          </React.Fragment>
        ))}
      </div>
      {isModalOpen && (
        <DeliveryModal id={fetchData.startStopover.centerId} isCenter={true} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
};

export default DeliveryRoutine;
