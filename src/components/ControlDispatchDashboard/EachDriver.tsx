import DeliveryStatusTag from "@/components/DeliveryStatusTag";
import Icon from "@/components/core/Icon";
import { BG_350 } from "@/styles/smColor";

interface EachDriverProps {
  name: string;
  totalOrder: number;
  onClickToggle: () => void;
  deliveryProgress: number;
  completed: number;
  smColor: keyof typeof BG_350;
  statusText: string;
  dispatchDetailStatus: VehicleStatusType;
  smNumber: number;
}

const EachDriver = ({
  name,
  totalOrder,
  onClickToggle,
  deliveryProgress,
  completed,
  smColor,
  statusText,
  dispatchDetailStatus,
}: EachDriverProps) => {
  return (
    <div className="flex flex-col gap-[10px] text-gray-900 text-B-14-B">
      <div className="flex h-[40px] items-center justify-between rounded-[4px] border border-gray-100">
        <ul className="box-border flex w-full items-center gap-[8px] py-[6px] pl-[12px]">
          <DeliveryStatusTag vehicleStatus={dispatchDetailStatus} restDisplay={false} />
          <li>{name}</li>
          <span className="h-[20px] w-0 border-l border-gray-100"></span>
          <li className="w-[40px] text-B-14-M">
            {completed}/{totalOrder}
          </li>
          <span className="h-[20px] w-0 border-l border-gray-100"></span>
          <li className="flex items-center">
            <p className="relative h-[14px] w-[60px] rounded-full bg-blue-50">
              <span
                className="absolute h-[14px] rounded-full bg-blue-400"
                style={{ width: `${(60 / 100) * deliveryProgress}px` }}
              ></span>
            </p>
            <p className="flex w-[55px] justify-end text-blue-400">{deliveryProgress}%</p>
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
