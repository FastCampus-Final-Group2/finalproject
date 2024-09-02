import Icon from "@/components/core/Icon";
import { TEXT_650, BG_50 } from "@/styles/smColor";
import DeliveryProgressInfo from "@/components/DeliveryProgressInfo";
import DeliveryRoutine from "@/components/DeliveryRoutine";

interface DeliveryProgressSideTabProps {
  isExpanded: boolean;
  onClose: () => void;
  selectedColor: keyof typeof BG_50 | keyof typeof TEXT_650;
}

const DeliveryProgressSideTab = ({ isExpanded, onClose, selectedColor }: DeliveryProgressSideTabProps) => {
  // 위 색상은 기사 목록 클릭 시 전환되어야 함.

  return (
    <>
      {isExpanded && (
        <div className="transition-width relative z-50 duration-300 ease-in-out">
          <div
            className={`flex h-[884px] w-fit flex-col gap-[24px] ${BG_50[selectedColor]} px-[32px] pb-[15px] pt-[20px]`}
          >
            <div className="flex w-fit flex-col gap-[4px] rounded-[8px] bg-white p-[20px]">
              <DeliveryProgressInfo selectedColor={selectedColor} />
            </div>
            <div className="flex h-[556px] w-fit flex-col gap-[4px] rounded-[8px] bg-white pl-[12px] pr-[16px] pt-[20px]">
              <DeliveryRoutine />
            </div>
          </div>
          <button
            className={`absolute right-[-16px] top-1/2 flex h-[128px] w-[48px] -translate-y-1/2 transform items-center justify-center rounded-full ${BG_50[selectedColor]}`}
            onClick={onClose}
          >
            <Icon id="arrowLargeDoubleLeft" size={24} className={`${TEXT_650[selectedColor]} `} />
          </button>
        </div>
      )}
    </>
  );
};

export default DeliveryProgressSideTab;
