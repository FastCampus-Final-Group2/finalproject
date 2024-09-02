import Icon from "@/components/core/Icon";
import CircularProgressBar from "@/components/core/CircularProgressBar";
import { BG_50 } from "@/styles/smColor";

interface FloorAreaRatioCardProps {
  smName: string;
  phoneNumber: string;
  progressRate: number;
  selectedColor: keyof typeof BG_50;
}

const FloorAreaRatioCard = ({ smName, phoneNumber, progressRate, selectedColor }: FloorAreaRatioCardProps) => {
  return (
    <div
      className={`flex h-fit w-fit flex-col items-center gap-[20px] rounded-[4px] ${BG_50[selectedColor]} px-[25px] pb-[14px] pt-[12px] text-B-14-M`}
    >
      <ul className="flex gap-[4px]">
        <li className="text-B-14-B">{smName}</li>
        <li>{phoneNumber}</li>
      </ul>
      <div className="relative flex h-[62px] items-center gap-[8px]">
        <div
          className={`absolute top-1/2 flex h-[62px] w-[42px] -translate-y-1/2 transform flex-col items-center ${BG_50[selectedColor]} `}
        >
          <p className="absolute top-[9px] text-gray-500">용적률</p>
          <Icon id="wing_3.5T" size={40} className="absolute top-[21px]" />
        </div>
        <div>
          <CircularProgressBar percentage={progressRate} bgColor={`${selectedColor}`} />
          {/* <CircularProgressBar percentage={progressRate} bgColor={`${bgColortext}`} /> */}
        </div>
      </div>
    </div>
  );
};

export default FloorAreaRatioCard;
