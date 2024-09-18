import Icon from "@/components/core/Icon";
import { TEXT_650, BG_50 } from "@/styles/smColor";
import DeliveryProgressInfo from "@/components/DeliveryProgressInfo";
import DeliveryRoutine from "@/components/DeliveryRoutine";
import { DispatchDetailApi } from "@/apis/dispatches/dispatchDetail";
import { useQuery } from "@tanstack/react-query";
import { DispatchDetailResponse, LocalTime } from "@/models/ApiTypes";

interface DeliveryProgressSideTabProps {
  isExpanded: boolean;
  onClose: () => void;
  selectedColor: keyof typeof BG_50 | keyof typeof TEXT_650;
  dispatchId: number | null;
  refreshDashboardData: () => Promise<void>;
  refreshSideTabData: () => Promise<void>;
  selectedDestinationId: number | null;
}

interface FetchData extends DispatchDetailResponse {
  smPhoneNumber?: string;
  smName?: string;
  floorAreaRatio?: number;
  vehicleType?: "WING_BODY" | "BOX" | "CARGO";
  vehicleTon?: number;
  completedOrderCount?: number;
  deliveryOrderCount?: number;
  totalTime?: LocalTime;
  issue?: string;
  startStopover?: { centerName: string; departureTime: string; centerId: number }; // LocalTime -> string으로 변경
  dispatchDetailList: [];
}

const fetchDispatchIdData = async (dispatchId: number | null): Promise<FetchData | null> => {
  if (dispatchId === null) return null;
  try {
    const data = await DispatchDetailApi.dispatchIdVehicleControl(dispatchId);
    return data as FetchData;
  } catch (error) {
    throw new Error("dispatchId 데이터 불러오기 실패");
  }
};

const DeliveryProgressSideTab = ({
  isExpanded,
  onClose,
  selectedColor,
  dispatchId,
  refreshDashboardData,
  selectedDestinationId,
}: DeliveryProgressSideTabProps) => {
  const {
    data: fetchData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vehicle-control", dispatchId],
    queryFn: () => fetchDispatchIdData(dispatchId),
    retry: 3,
    enabled: !!dispatchId && isExpanded,
  });

  if (!isExpanded) return null;
  if (isLoading) return <div>dispatchId: {dispatchId} 로딩 중...</div>;
  if (error) return <div>오류: {(error as Error).message}</div>;
  if (!fetchData) return <div>데이터가 없습니다.</div>;
  const data = fetchData as FetchData;
  console.log("사이드바 데이터", fetchData);
  return (
    <div className="transition-width relative z-50 duration-300 ease-in-out">
      <div
        className={`${BG_50[selectedColor]} flex h-[calc(100vh-196px)] w-fit flex-col gap-[24px] overflow-y-auto px-[32px] pb-[15px] pt-[20px] scrollbar-hide`}
      >
        <div className="flex w-fit flex-col gap-[4px] rounded-[8px] bg-white p-[20px]">
          <DeliveryProgressInfo
            selectedColor={selectedColor}
            fetchData={fetchData as Required<FetchData>}
            dispatchId={dispatchId ?? 0}
            refreshSideTabData={async () => {
              await refetch();
            }}
          />
        </div>
        <div className="flex max-h-[556px] w-fit flex-col gap-[4px] rounded-[8px] bg-white pl-[12px] pr-[16px] pt-[20px]">
          <DeliveryRoutine
            fetchData={fetchData as any}
            refreshSideTabData={async () => {
              await refetch();
            }}
            refreshDashboardData={refreshDashboardData}
            selectedDestinationId={selectedDestinationId}
          />
        </div>
      </div>
      <button
        className={`absolute right-[-16px] top-1/2 flex h-[128px] w-[48px] -translate-y-1/2 transform items-center justify-center rounded-full ${BG_50[selectedColor]}`}
        onClick={onClose}
      >
        <Icon id="arrowLargeDoubleLeft" size={24} className={`${TEXT_650[selectedColor]} `} />
      </button>
    </div>
  );
};

export default DeliveryProgressSideTab;
