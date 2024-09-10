import DeliveryIssues from "./DeliveryIssues";
import FloorAreaRatioCard from "./FloorAreaRatioCard";
import DeliveryCompletedCard from "./DeliveryCompletedCard";
import AccessTimeRefresh from "@/components/AccessTimeRefresh";
import { BG_100 } from "@/styles/smColor";
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
    totalTime: number;
    issue: string;
  };
  dispatchId: number;
}

const DeliveryProgressInfo = ({ selectedColor, fetchData, dispatchId }: DeliveryProgressInfoProps) => {
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
        />
        {/* todo: deliveryProgressRate={50} 수정하기 */}
      </div>
      <div className="flex justify-end">
        <AccessTimeRefresh />
      </div>
      <DeliveryIssues issue={fetchData.issue ?? []} dispatchId={dispatchId} />
    </div>
  );
};

export default DeliveryProgressInfo;
