import DeliveryStatusTag from "@/components/DeliveryStatusTag";

const Moving = () => {
  return (
    <div className="ml-[50px] flex items-center gap-[8px] pl-[18px]">
      <DeliveryStatusTag>이동 중</DeliveryStatusTag>
      <p className="text-B-14-R">
        <span className="text-B-14-B">48</span>분 소요 예상
      </p>
    </div>
  );
};

export default Moving;
