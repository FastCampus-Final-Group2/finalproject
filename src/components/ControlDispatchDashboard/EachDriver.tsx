import DeliveryStatusTag from "@/components/DeliveryStatusTag";
import Icon from "@/components/core/Icon";
import { BG_350 } from "@/styles/smColor";

type VehicleStatusType =
  | "DELIVERY_DELAY"
  | "WORK_COMPLETED"
  | "CANCELED"
  | "WORK_WAITING"
  | "WORK_START"
  | "MOVING"
  | "RESTING"
  | "RESTING_TIME"
  | "default";

interface EachDriverProps {
  dispatchId: number;
  smName: string;
  orderNum: number;
  onClickToggle: () => void;
  deliveryProgress: number;
  completedOrderNum: number;
  smColor: keyof typeof BG_350;
  dispatchStatus: VehicleStatusType;
}

const EachDriver = ({
  dispatchId,
  smName,
  orderNum,
  onClickToggle,
  deliveryProgress,
  completedOrderNum,
  smColor,
  dispatchStatus,
}: EachDriverProps) => {
  const dashboardDriverProgress = deliveryProgress > 100 ? 100 : deliveryProgress;

  return (
    <div className="flex flex-col gap-[10px] text-gray-900 text-B-14-B">
      <div className="flex h-[40px] items-center justify-between rounded-[4px] border border-gray-100">
        <ul className="box-border flex w-full items-center gap-[8px] py-[6px] pl-[12px]">
          <DeliveryStatusTag vehicleStatus={dispatchStatus} restDisplay={false} />
          <li>{smName}</li>
          <span className="h-[20px] w-0 border-l border-gray-100"></span>
          <li className="flex w-[40px] justify-center text-B-14-M">
            {completedOrderNum}/{orderNum}
          </li>
          <span className="h-[20px] w-0 border-l border-gray-100"></span>
          <li className="flex items-center">
            <p className="relative h-[14px] w-[60px] rounded-full bg-blue-50">
              <span
                className="absolute h-[14px] rounded-full bg-blue-400"
                style={{ width: `${(60 / 100) * dashboardDriverProgress}px` }}
              ></span>
            </p>
            <p className="flex w-[55px] justify-end text-blue-400">{dashboardDriverProgress}%</p>
          </li>
        </ul>

        <ul className="group relative">
          <li
            className={`flex h-10 w-3 items-center rounded-br rounded-tr ${BG_350[smColor]} px-[4px] transition-all duration-300 ease-in-out group-hover:w-[22px] group-hover:justify-center`}
          >
            <button className="flex h-full w-full items-center justify-center" onClick={onClickToggle}>
              <Icon
                id="arrowLargeDoubleRight"
                size={14}
                className="text-white opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100"
              />
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default EachDriver;
