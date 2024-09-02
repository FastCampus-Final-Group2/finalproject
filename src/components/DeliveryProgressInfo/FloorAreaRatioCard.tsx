import Icon from "@/components/core/Icon";
import CircularProgressBar from "@/components/core/CircularProgressBar";

interface FloorAreaRatioCardProps {
  smName: string;
  phoneNumber: string;
  progressRate: number;
}

const FloorAreaRatioCard = ({ smName, phoneNumber, progressRate }: FloorAreaRatioCardProps) => {
  return (
    <div className="flex h-fit w-fit flex-col items-center gap-[20px] rounded-[4px] bg-lime-100 px-[25px] pb-[14px] pt-[12px] text-B-14-M">
      <ul className="flex gap-[4px]">
        <li className="text-B-14-B">{smName}</li>
        <li>{phoneNumber}</li>
      </ul>
      <div className="relative flex h-[62px] items-center gap-[8px]">
        <div className="absolute top-1/2 flex h-[62px] w-[42px] -translate-y-1/2 transform flex-col items-center bg-lime-100">
          <p className="absolute top-[9px] text-gray-500">용적률</p>
          <Icon id="wing_3.5T" size={40} className="absolute top-[21px]" />
        </div>
        <div>
          <CircularProgressBar percentage={progressRate} bgColor={"lime"} />
        </div>
      </div>
    </div>
  );
};

export default FloorAreaRatioCard;
