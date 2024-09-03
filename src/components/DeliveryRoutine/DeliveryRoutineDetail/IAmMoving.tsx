import DeliveryStatusTag from "@/components/DeliveryStatusTag";

// 소요 시간 받아서 표시하기

const IAmMoving = () => {
  return (
    <div className="ml-[50px] flex items-center gap-[8px] pl-[18px]">
      <DeliveryStatusTag vehicleStatus="MOVING" />
      <p className="text-B-14-R">
        <span className="text-B-14-B">48</span>분 소요 예상
      </p>
    </div>
  );
};

export default IAmMoving;
