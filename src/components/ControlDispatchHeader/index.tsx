import CopyButton from "@/components/core/CopyButton";
import Icon from "@/components/core/Icon";
import Link from "next/link";
import { DispatchListResponse } from "@/models/ApiTypes";
import { useSetRecoilState } from "recoil";
import { lastVisitedControlPageState } from "@/atoms/control";
import useResetControlAtoms from "@/hooks/useResetControlAtoms";
// todo: 날짜, 택배, 빠진 정보 추가하기

const ControlDiapstchHeader = ({ fetchedData }: { fetchedData: DispatchListResponse }) => {
  const setLastVisitedControlPage = useSetRecoilState(lastVisitedControlPageState);
  const resetControlAtoms = useResetControlAtoms();
  const handleBackToList = () => {
    setLastVisitedControlPage((prev) => ({ ...prev, detail: null }));
    resetControlAtoms();
  };
  const convertDispatchCodeToDate = (dispatchCode: string): string => {
    // 정규 표현식을 사용하여 연도, 월, 일 부분 추출
    let dateMatch = dispatchCode.match(/^(\d{4})(\d{2})(\d{2})/);
    if (dateMatch) {
      // 'YYYYMMDD' 형식인 경우
      const [, year, month, day] = dateMatch;
      return `${year}.${month}.${day}`;
    }

    dateMatch = dispatchCode.match(/^(\d{2})(\d{2})(\d{2})/);
    if (dateMatch) {
      // 'YYMMDD' 형식인 경우
      const [, year, month, day] = dateMatch;
      return `20${year}.${month}.${day}`;
    }

    throw new Error("Invalid dispatch code format");
  };
  const formattedDate = convertDispatchCodeToDate(fetchedData.dispatchCode ?? "");

  return (
    <div className="flex h-[92px] items-center justify-between border-b px-[40px] pb-[24px] pt-[28px]">
      <ul className="flex items-center gap-[16px]">
        <li className="flex items-center gap-[4px]">
          <p className="text-T-18-B">{fetchedData.dispatchCode ?? ""}</p>
          <CopyButton copyString={fetchedData.dispatchCode ?? ""} />
        </li>
        <li className="text-T-18-M">{fetchedData.dispatchName ?? ""}</li>
        <li className="flex gap-[8px]">
          <p className="rounded-[4px] bg-gray-100 p-[8px] text-gray-700 text-B-14-M">{formattedDate}</p>
          <p className="rounded-[4px] bg-gray-700 p-[8px] text-white text-B-14-M">택배</p>
        </li>
      </ul>
      <Link href="/control" className="flex items-center gap-[4px] hover:text-blue-500" onClick={handleBackToList}>
        <Icon id="list" className="hover:text-blue-500" />
        <p className="text-T-16-B">배차목록 보기</p>
      </Link>
    </div>
  );
};

export default ControlDiapstchHeader;
