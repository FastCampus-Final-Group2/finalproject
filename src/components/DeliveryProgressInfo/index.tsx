import DeliveryIssues from "./DeliveryIssues";
import FloorAreaRatioCard from "./FloorAreaRatioCard";
import DeliveryCompletedCard from "./DeliveryCompletedCard";
import AccessTimeRefresh from "@/components/AccessTimeRefresh";

const DeliveryProgressInfo = () => {
  return (
    <div className="flex flex-col gap-[12px]">
      <div className="flex justify-between">
        <FloorAreaRatioCard phoneNumber={"010-1234-5555"} smName={"김도희"} progressRate={70} />
        <DeliveryCompletedCard deliveryProgressRate={50} />
      </div>
      <div className="flex justify-end">
        <AccessTimeRefresh />
      </div>
      <DeliveryIssues />
    </div>
  );
};

export default DeliveryProgressInfo;
