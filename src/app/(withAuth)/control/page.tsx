"use client";

import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
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
        status: status,
        isManager: false,
        startDateTime: "1900-01-01T23:59:59",
        endDateTime: "3000-12-31T23:59:59",
        searchOption: "",
        searchKeyword: "",
      },
    });

    if (error) {
      throw new Error(error.type || "데이터 가져오기 중 오류 발생");
    }

    return results as DispatchData;
  } catch (err) {
    console.log("접근 거부");
    throw err;
  }
};

interface DispatchData {
  status?: "IN_TRANSIT" | "WAITING" | "COMPLETED";
  inProgress: number;
  waiting: number;
  completed: number;
  results: DispatchResult[];
}

const ControlPage = () => {
  const [selectedState, setSelectedState] = useState<"IN_TRANSIT" | "WAITING" | "COMPLETED">("IN_TRANSIT");
  const [page, setPage] = useState(1);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [searchResults, setSearchResults] = useState<DispatchResult[]>([]);

  const {
    data: fetchedData = {
      inProgress: 0,
      waiting: 0,
      completed: 0,
      results: [] as DispatchResult,
    } as DispatchData,
    isLoading,
    error,
    // refetch,
  } = useQuery({
    queryKey: ["dispatchData", selectedState],
    queryFn: fetchDispatchData,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  // useEffect(() => {
  //   if (fetchedData && fetchedData.results && fetchedData.results.length > 0) {
  //     const firstResult = fetchedData.results[0];
  //     if (firstResult && firstResult.status && firstResult.status !== selectedState) {
  //       setSelectedState(firstResult.status);
  //       refetch();
  //     }
  //   }
  // }, [fetchedData, selectedState, refetch]);

  // 로딩 중이거나 에러 발생 시 처리
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const handleStateChange = (state: "IN_TRANSIT" | "WAITING" | "COMPLETED") => {
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

  const handleSearch = (results: DispatchResult[]) => {
    setSearchResults(results);
  };

  return (
    <div className="h-[calc(100vh-104px)] overflow-y-auto p-[48px]">
      <h1 className="mb-[24px] text-H-28-B">차량 관제</h1>
      <div className="flex flex-col gap-[28px] pl-[10px]">
        <SearchBars data={fetchedData.results} onSearch={handleSearch} />
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
          results={searchResults.length > 0 ? searchResults : fetchedData.results}
          onSelectedItemsCountChange={handleSelectedItemsCountChange}
        />
        <Pagination currentPage={page} totalItems={fetchedData.results?.length} onPageChange={setPage} />
      </div>
    </div>
  );
};

export default ControlPage;
