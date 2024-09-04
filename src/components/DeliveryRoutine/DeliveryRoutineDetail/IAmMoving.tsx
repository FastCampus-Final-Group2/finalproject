import DeliveryStatusTag from "@/components/DeliveryStatusTag";

// 소요 시간 받아서 표시하기

const IAmMoving = () => {
  return (
    <div className="relative ml-[50px] flex items-center gap-[8px] pl-[18px] before:absolute before:left-[-28px] before:top-[2px] before:h-[43px] before:border-l-[2px] before:border-dashed before:border-gray-400">
      <DeliveryStatusTag vehicleStatus="MOVING" />
      <p className="text-B-14-R">
        <span className="text-B-14-B">48</span>분 소요 예상
      </p>
    </div>
  );
};

export default IAmMoving;
