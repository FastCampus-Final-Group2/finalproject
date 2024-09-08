import CopyButton from "@/components/core/CopyButton";
import Icon from "@/components/core/Icon";
import Link from "next/link";
import { DispatchListResponse } from "@/models/ApiTypes";
// todo: 날짜, 택배, 빠진 정보 추가하기
const ControlDiapstchHeader = ({ fetchedData }: { fetchedData: DispatchListResponse }) => {
  return (
    <div className="flex h-[92px] items-center justify-between border-b px-[40px] pb-[24px] pt-[28px]">
      <ul className="flex items-center gap-[16px]">
        <li className="flex items-center gap-[4px]">
          <p className="text-T-18-B">{fetchedData.dispatchCode ?? ""}</p>
          <CopyButton copyString={fetchedData.dispatchCode ?? ""} />
        </li>
        <li className="text-T-18-M">{fetchedData.dispatchName ?? ""}</li>
        <li className="flex gap-[8px]">
          <p className="rounded-[4px] bg-gray-100 p-[8px] text-gray-700 text-B-14-M">2024.08.20</p>
          <p className="rounded-[4px] bg-gray-700 p-[8px] text-white text-B-14-M">택배</p>
        </li>
      </ul>
      <Link href="/control" className="flex items-center gap-[4px] hover:text-blue-500">
        <Icon id="list" className="hover:text-blue-500" />
        <p className="text-T-16-B">배차목록 보기</p>
      </Link>
    </div>
  );
};

export default ControlDiapstchHeader;
