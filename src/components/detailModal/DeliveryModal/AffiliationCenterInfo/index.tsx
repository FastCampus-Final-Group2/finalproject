import { AFFILIATION_CENTER_INFO_LABEL } from "@/components/detailModal/DeliveryModal/index.constants";

interface AffiliationCenterInfoProps {
  centerId: number;
  centerName: string;
  basicAddress: string;
}

const AffiliationCenterInfo = ({ centerId, centerName, basicAddress }: AffiliationCenterInfoProps) => {
  return (
    <div className="flex w-[680px] flex-col gap-[18px] rounded-lg bg-white px-4 py-5">
      <div className="text-gray-900 text-T-16-B">소속 센터 정보</div>
      <div className="w-[652px]">
        <div className="flex bg-blue-30 py-1.5">
          <div className="w-[164px] text-center text-gray-900 text-B-14-B">
            {AFFILIATION_CENTER_INFO_LABEL.centerId}
          </div>
          <div className="w-[164px] text-center text-gray-900 text-B-14-B">
            {AFFILIATION_CENTER_INFO_LABEL.centerName}
          </div>
          <div className="text-gray-900 text-B-14-B">{AFFILIATION_CENTER_INFO_LABEL.basicAddress}</div>
        </div>
        <div className="flex border-b border-gray-200 bg-white py-1.5">
          <div className="w-[164px] text-center text-gray-900 text-B-14-M">{centerId}</div>
          <div className="w-[164px] text-center text-gray-900 text-B-14-M">{centerName}</div>
          <div className="text-gray-900 text-B-14-M">{basicAddress}</div>
        </div>
      </div>
    </div>
  );
};

export default AffiliationCenterInfo;
