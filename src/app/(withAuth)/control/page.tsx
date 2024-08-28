"use client";
import { useEffect, useState } from "react";
import DispatchLists from "@/components/Dispatchlists";
import TabForDispatchedList from "@/components/TabForDispatchedList";
import SearchBars from "@/components/SearchBar";
import PaginationButtons from "@/components/core/Pagination";
import mockdata from "./mockdata.json";
import ListSelection from "@/components/ListSelection";

interface DispatchItem {
  progress: number;
  diapatchCode: string;
  dispatchName: string;
  startDateTime: string;
  totalOrder: number;
  smNum: number;
  manager: string;
}

const ControlPage = () => {
  const [selectedState, setSelectedState] = useState("주행중");
  const [filteredResults, setFilteredResults] = useState<DispatchItem[]>([]);
  const [page, setPage] = useState(1);
  const [currentPageGroup, setCurrentPageGroup] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    const filterResults = (): DispatchItem[] => {
      switch (selectedState) {
        case "주행중":
          return mockdata.results.filter((item) => item.progress > 0 && item.progress < 100);
        case "주행대기":
          return mockdata.results.filter((item) => item.progress === 0);
        case "주행완료":
          return mockdata.results.filter((item) => item.progress === 100);
        default:
          return [];
      }
    };

    const results = filterResults();
    setFilteredResults(results);
    setPage(1); // 탭을 변경할 때 페이지를 초기화
    setCurrentPageGroup(1); // 탭을 변경할 때 페이지 그룹도 초기화
  }, [selectedState]);

  const paginatedResults = filteredResults.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <>
      <h1 className="text-H-28-B">차량 관제</h1>
      <div className="flex flex-col gap-[28px] pl-[10px]">
        <SearchBars data={mockdata} />
        <TabForDispatchedList
          data={{
            inProgress: mockdata.results.filter((item) => item.progress > 0 && item.progress < 100).length,
            waiting: mockdata.results.filter((item) => item.progress === 0).length,
            completed: mockdata.results.filter((item) => item.progress === 100).length,
          }}
          onStateChange={setSelectedState}
        />
        <ListSelection data={mockdata} />
        <DispatchLists
          data={{
            inProgress: filteredResults.filter((item) => item.progress > 0 && item.progress < 100).length,
            waiting: filteredResults.filter((item) => item.progress === 0).length,
            completed: filteredResults.filter((item) => item.progress === 100).length,
            results: paginatedResults,
          }}
        />
        <PaginationButtons
          page={page}
          totalItems={filteredResults.length}
          perPage={itemsPerPage}
          onPageChange={setPage}
          currentPageGroup={currentPageGroup}
          setCurrentPageGroup={setCurrentPageGroup}
        />
      </div>
    </>
  );
};

export default ControlPage;
