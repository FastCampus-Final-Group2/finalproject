import DeliveryIssues from "./DeliveryIssues";
import FloorAreaRatioCard from "./FloorAreaRatioCard";
import DeliveryCompletedCard from "./DeliveryCompletedCard";
import AccessTimeRefresh from "@/components/AccessTimeRefresh";
import { BG_100 } from "@/styles/smColor";
import { LocalTime } from "@/models/ApiTypes";
// import { CourseResponse } from "@/models/ApiTypes";

interface DeliveryProgressInfoProps {
  selectedColor: keyof typeof BG_100;
  fetchData: {
    smPhoneNumber: string;
    smName: string;
    floorAreaRatio: number;
    vehicleType: string;
    vehicleTon: number;
    completedOrderCount: number;
    deliveryOrderCount: number;
    totalTime: LocalTime;
    totalDistance: number;
    progressionRate: number;
    issue: string;
  };
  dispatchId: number;
  refreshData: () => Promise<void>;
}

const DeliveryProgressInfo = ({ selectedColor, fetchData, dispatchId, refreshData }: DeliveryProgressInfoProps) => {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex justify-between">
        <FloorAreaRatioCard
          selectedColor={selectedColor}
          smPhoneNumber={fetchData.smPhoneNumber ?? ""}
          smName={fetchData.smName ?? ""}
          floorAreaRatio={fetchData.floorAreaRatio ?? 0}
          vehicleType={fetchData.vehicleType ?? ""}
          vehicleTon={Number(fetchData.vehicleTon) || 0}
        />
        <DeliveryCompletedCard
          selectedColor={selectedColor}
          completedOrderCount={fetchData.completedOrderCount ?? 0}
          deliveryOrderCount={fetchData.deliveryOrderCount ?? 0}
          totalTime={String(fetchData.totalTime ?? 0)}
          progressionRate={fetchData.progressionRate ?? 0}
          totalDistance={fetchData.totalDistance ?? 0}
          refreshData={refreshData}
        />
      </div>
      <div className="flex justify-end">
        <AccessTimeRefresh onClick={refreshData} />
      </div>
      <DeliveryIssues issue={fetchData.issue ?? ""} dispatchId={dispatchId} />
    </div>
  );
};

export default DeliveryProgressInfo;
