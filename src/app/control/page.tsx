import SearchDate from "@/components/calendarDouble/SearchDate";
import Driving from "@/components/Driving";
import SearchBars from "@/components/searcharea/SearchBars";

const page = () => {
  return (
    <>
      <h1 className="text-H-28-B">차량 관제</h1>
      <SearchBars />
      <Driving />
      <p>총 00건 | 선택 00건, 배차 강제 종료, 액셀 다운로드 버튼</p>
      <p>리스트(체크박스, 진행률, 배차 코드, 이름, 상하차 시작 일지, 총 주문, 드라이버 수, 배차 담당자)</p>
      <p>페이지네이션 버튼</p>
      <SearchDate />
    </>
  );
};

export default page;
