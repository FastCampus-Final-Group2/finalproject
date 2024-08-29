import Icon from "@/components/core/Icon";
import SelectedDelivery from "@/components/SelectedDelivery";
import DeliveryRoutineDetail from "@/components/DeliveryRoutine/DeliveryRoutineDetail";
import DeliveryStopoverListCard from "@/components/DeliveryRoutine/DeliveryStopoverListCard";

const startEnd = [
  { status: "운송 시작", centerName: "마포센터", timetext: "시작", time: "14:00" },
  { status: "운송 종료", centerName: "", timetext: "종료 예정", time: "20:00" },
];

const DeliveryRoutine = () => {
  return (
    <div className="flex flex-col gap-[4px] text-T-18-B">
      <SelectedDelivery />

      <div className="flex w-[430px] justify-between">
        <div className="flex w-[46px] justify-center pt-[18px]">
          <Icon id="circleFill" size={16} className="text-gray-400" />
        </div>
        <DeliveryStopoverListCard border="deliveryStartEnd">
          <ul className="flex items-end gap-[8px]">
            <li>{startEnd[0].status}</li>
            <li className="cursor-pointer border-b border-blue-500 text-blue-500 text-T-16-M">
              {startEnd[0].centerName}
            </li>
            {/* todo: 마포센터에 모달 달기 */}
          </ul>
          <ul className="flex gap-[4px] text-gray-700 text-B-14-M">
            <li>{startEnd[0].timetext}</li>
            <li>{startEnd[0].time}</li>
          </ul>
        </DeliveryStopoverListCard>
      </div>

      <DeliveryRoutineDetail />

      <div className="flex w-[430px] justify-between">
        <div className="flex w-[46px] justify-center pt-[18px]">
          <Icon id="circleFill" size={16} className="text-gray-400" />
        </div>
        <DeliveryStopoverListCard border="deliveryStartEnd" className="flex">
          <ul className="flex items-end gap-[8px]">
            <li>{startEnd[1].status}</li>
            <li className="cursor-pointer border-b border-blue-500 text-blue-500 text-T-16-M">
              {startEnd[1].centerName}
            </li>
            {/* todo: 마포센터에 모달 달기 */}
          </ul>
          <ul className="flex gap-[4px] text-gray-700 text-B-14-M">
            <li>{startEnd[1].timetext}</li>
            <li>{startEnd[1].time}</li>
          </ul>
        </DeliveryStopoverListCard>
      </div>
    </div>
  );
};

export default DeliveryRoutine;
