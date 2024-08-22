import DispatchLists from "@/components/dispatchLists";
import Driving from "@/components/Driving";
import SearchBars from "@/components/searchBar";

const page = () => {
  return (
    <>
      <h1 className="text-H-28-B">차량 관제</h1>
      <SearchBars />
      <Driving />
      <div className="flex">
        <p>총 00건 | 선택 00건</p>
        <button>배차 강제 종료</button>
        <button>액셀 다운로드 버튼</button>
      </div>
      <DispatchLists />
    </>
  );
};

export default page;
