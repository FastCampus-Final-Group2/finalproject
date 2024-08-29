import DeliveryProgressInfo from "@/components/DeliveryProgressInfo";
import AccessTimeRefresh from "@/components/AccessTimeRefresh";
import DeliveryRoutine from "@/components/DeliveryRoutine";
const ControlDetailPage = () => {
  return (
    <>
      {/* <div className="flex justify-between">
        <ul className="flex items-center gap-[16px]">
          <li className="flex items-center gap-[4px]">
            <p className="text-T-18-B">240808C001#1</p>
            <Icon id="copy" size={16} />
          </li>
          <li className="text-T-18-M">인플루언서 A 긴급건</li>
          <li className="flex gap-[8px]">
            <Button size="i" shape="fill" className="text-B-14-M">
              2024.08.20
            </Button>
            <Button size="i" shape="fill" className="bg-gray-500 text-B-14-M">
              택배
            </Button>
          </li>
        </ul>
        <div className="flex gap-[4px]">
          <Icon id="menuKebab" />
          <div>배차목록 보기</div>
        </div>
      </div> */}

      <div className="flex h-[884px] w-fit flex-col gap-[24px] bg-purple-50 px-[32px] pb-[15px] pt-[20px]">
        <div className="flex w-fit flex-col gap-[4px] rounded-[8px] bg-white p-[20px]">
          <DeliveryProgressInfo />
        </div>
        <div className="flex w-fit flex-col gap-[4px] rounded-[8px] bg-white pb-[8px] pl-[12px] pr-[16px] pt-[20px]">
          <DeliveryRoutine />
        </div>
      </div>
    </>
  );
};

export default ControlDetailPage;
