import Icon from "@/components/core/Icon";
import CircularProgressBar from "@/components/core/CircularProgressBar";
import { BG_50 } from "@/styles/smColor";
import { IconId } from "@/components/core/Icon";

interface FloorAreaRatioCardProps {
  smName: string;
  smPhoneNumber: string;
  floorAreaRatio: number;
  vehicleType: string;
  vehicleTon: number;
  selectedColor: keyof typeof BG_50;
}

const FloorAreaRatioCard = ({
  smName,
  smPhoneNumber,
  floorAreaRatio,
  vehicleType,
  vehicleTon,
  selectedColor,
}: FloorAreaRatioCardProps) => {
  const getIconId = (type: string, tone: number): IconId => {
    const typeMap: { [key: string]: string } = {
      WING_BODY: "wing",
      BOX: "box",
      CARGO: "cargo",
    };
    const formattedType = typeMap[type] || "default";
    return `${formattedType}_${tone}T` as IconId;
  };

  const iconId = getIconId(vehicleType, vehicleTon);
  console.log("iconId", iconId);

  return (
    <div
      className={`flex h-fit w-fit flex-col items-center gap-[20px] rounded-[4px] ${BG_50[selectedColor]} px-[25px] pb-[14px] pt-[12px] text-B-14-M`}
    >
      <ul className="flex gap-[4px]">
        <li className="text-B-14-B">{smName}</li>
        <li>{smPhoneNumber}</li>
      </ul>
      <div className="relative flex h-[62px] items-center gap-[8px]">
        <div
          className={`absolute top-1/2 flex h-[62px] w-[42px] -translate-y-1/2 transform flex-col items-center ${BG_50[selectedColor]} `}
        >
          <p className="absolute top-[9px] text-gray-500">용적률</p>
          <Icon id={iconId} size={40} className="absolute top-[21px]" />
        </div>
        <div>
          <CircularProgressBar percentage={floorAreaRatio} bgColor={`${selectedColor}`} />
        </div>
      </div>
    </div>
  );
};

export default FloorAreaRatioCard;
