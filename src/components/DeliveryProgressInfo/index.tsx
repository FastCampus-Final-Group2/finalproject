import DeliveryIssues from "./DeliveryIssues";
import FloorAreaRatioCard from "./FloorAreaRatioCard";
import DeliveryCompletedCard from "./DeliveryCompletedCard";
import AccessTimeRefresh from "@/components/AccessTimeRefresh";

const DeliveryProgressInfo = () => {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex justify-between">
        <FloorAreaRatioCard />
        <DeliveryCompletedCard />
      </div>
      <AccessTimeRefresh />
      <DeliveryIssues />
    </div>
  );
};

export default DeliveryProgressInfo;
