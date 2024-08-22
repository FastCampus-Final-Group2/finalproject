import DispatchLists from "@/components/dispatchLists";
import TabForList from "@/components/TabForList";
import SearchBars from "@/components/searchBar";
import Button from "@/components/core/Button";

const page = () => {
  return (
    <>
      <h1 className="text-H-28-B">차량 관제</h1>
      <SearchBars />
      <TabForList />
      <div className="flex">
        <p>총 00건 | 선택 00건</p>
        <Button size="s" type="submit">
          배차 강제 종료
        </Button>
        <Button size="s" shape="text" className="">
          액셀 다운로드
        </Button>
      </div>
      <DispatchLists />
    </>
  );
};

export default page;
