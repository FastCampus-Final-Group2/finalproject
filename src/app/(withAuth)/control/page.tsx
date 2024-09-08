"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { DispatchNumberApi } from "@/apis/dispatches/dispatchNumber";
import { DispatchResult } from "@/models/ApiTypes";
import DispatchLists from "@/components/Dispatchlists";
import TabForDispatchedList from "@/components/TabForDispatchedList";
import SearchBars from "@/components/SearchBar";
import ListSelection from "@/components/ListSelection";
import Pagination from "@/components/core/Pagination";

// API를 통해 데이터를 가져오는 함수
const fetchDispatchData = async ({ queryKey }: { queryKey: [string, "IN_TRANSIT" | "WAITING" | "COMPLETED"] }) => {
  const status = queryKey[1];
  try {
    const { error, results } = await DispatchNumberApi.search({
      request: {
        status: status, // 상태에 따라 다른 데이터를 가져옴
        isManager: false,
        startDate: "1900-01-01",
        endDateTime: "3000-12-31T23:59:59",
        searchOption: "",
        searchKeyword: "",
      },
    });

    if (error) {
      console.log("access denied"); // 실패 시 메시지 출력
      throw new Error(error.type || "An error occurred while fetching data");
    }

    console.log("access success"); // 성공 시 메시지 출력
    console.log("results?.results", results); // 성공 시 메시지 출력
    return (
      (results as DispatchData) ||
      ({
        inProgress: 0,
        waiting: 0,
        completed: 0,
        results: [] as DispatchResult,
      } as DispatchData)
    );
  } catch (err) {
    console.log("access denied"); // 에러 발생 시 메시지 출력
    throw err;
  }
};

interface DispatchData {
  inProgress: number;
  waiting: number;
  completed: number;
  results: DispatchResult[];
}

const ControlPage = () => {
  const [selectedState, setSelectedState] = useState("IN_TRANSIT");
  const [page, setPage] = useState(1);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);

  // useQuery를 사용하여 데이터를 가져옴
  const {
    data: fetchedData = {
      inProgress: 0,
      waiting: 0,
      completed: 0,
      results: [] as DispatchResult,
    } as DispatchData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dispatchData", selectedState], // Query key, selectedState가 변경될 때마다 새로 데이터 요청
    queryFn: fetchDispatchData, // fetch 함수
    // keepPreviousData: true, // 이전 데이터를 유지하면서 새로운 데이터를 불러옴
    refetchOnWindowFocus: false, // 창을 다시 포커스할 때 데이터를 다시 가져오지 않음
    retry: 3,
  });

  // 로딩 중이거나 에러 발생 시 처리
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const handleStateChange = (state: string) => {
    setSelectedState(state);
  };

  const handleSelectedItemsCountChange = (count: number) => {
    setSelectedItemsCount(count);
  };

  const getCurrentCount = () => {
    switch (selectedState) {
      case "IN_TRANSIT":
        return fetchedData.inProgress;
      case "WAITING":
        return fetchedData.waiting;
      case "COMPLETED":
        return fetchedData.completed;
      default:
        return 0;
    }
  };

  return (
    <>
      <h1 className="text-H-28-B">차량 관제</h1>
      <div className="flex flex-col gap-[28px] pl-[10px]">
        <SearchBars data={fetchedData.results} />
        <TabForDispatchedList
          data={{
            inProgress: fetchedData.inProgress,
            waiting: fetchedData.waiting,
            completed: fetchedData.completed,
          }}
          onStateChange={handleStateChange}
          initialState={selectedState}
        />
        <ListSelection currentCount={getCurrentCount()} selectedCount={selectedItemsCount} />
        <DispatchLists
          inProgress={fetchedData.inProgress}
          waiting={fetchedData.waiting}
          completed={fetchedData.completed}
          results={fetchedData.results} // 페이지에 맞는 결과 전달
          onSelectedItemsCountChange={handleSelectedItemsCountChange}
        />
        <Pagination currentPage={page} totalItems={fetchedData.results?.length} onPageChange={setPage} />
      </div>
    </>
  );
};

export default ControlPage;
