"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import { DispatchNumberApi } from "@/apis/dispatches/dispatchNumber";
import { DispatchResult } from "@/models/ApiTypes";
import DispatchLists from "@/components/Dispatchlists";
import TabForDispatchedList from "@/components/TabForDispatchedList";
import SearchBars from "@/components/SearchBar";
import Pagination from "@/components/core/Pagination";
import { useSetRecoilState, useRecoilValue, useRecoilState } from "recoil";
import {
  lastVisitedControlPageState,
  controlSearchOptionState,
  searchTextInputState,
  controlOnlyClientState,
  searchStartTimeState,
  searchEndTimeState,
  searchDataState,
  searchParamsState,
  controlTabState,
  todayDateState,
  sevenDaysLaterState,
} from "@/atoms/control";
import { useRouter } from "next/navigation";
import ListSelectionCount from "@/components/ListSelectionCount";
import dayjs from "dayjs";

/* todos: 
  1. 내 담당 주문 보기 기능 구현하기
  13. 새로고침 버튼 클릭 시 recoil reset
  14. 달력 선택 recoil status 만들기
  15. 캘린더 확인 클릭 시 검색 parameter를 고쳐서 보내야 하는데 그렇게 하지 못하고 있는 모양임.
*/

interface DispatchData {
  status?: "IN_TRANSIT" | "WAITING" | "COMPLETED";
  inProgress: number;
  waiting: number;
  completed: number;
  results: DispatchResult[];
}

interface SearchParams {
  status: "IN_TRANSIT" | "WAITING" | "COMPLETED";
  isManager: boolean;
  startDateTime: string;
  endDateTime: string;
  searchOption: string;
  searchKeyword: string;
}

const ControlPage = () => {
  const setLastVisitedControlPage = useSetRecoilState(lastVisitedControlPageState);
  const lastVisitedControlPage = useRecoilValue(lastVisitedControlPageState);
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [selectedDispatchIds, setSelectedDispatchIds] = useState<number[]>([]);
  const [searchOption] = useRecoilState(controlSearchOptionState);
  const [searchKeyword] = useRecoilState(searchTextInputState);
  const [onlyClient] = useRecoilState(controlOnlyClientState);
  const [startDate] = useRecoilState(searchStartTimeState);
  const [endDate] = useRecoilState(searchEndTimeState);
  const [searchData, setSearchData] = useRecoilState(searchDataState);
  const [searchParams, setSearchParams] = useRecoilState(searchParamsState);
  const [selectedState, setSelectedState] = useRecoilState(controlTabState);
  const [todayDate, setTodayDate] = useRecoilState(todayDateState);
  const [sevenDaysLater, setSevenDaysLater] = useRecoilState(sevenDaysLaterState);

  useEffect(() => {
    setLastVisitedControlPage((prev) => ({ ...prev, general: "/control" }));
    if (lastVisitedControlPage.detail) {
      router.push(lastVisitedControlPage.detail);
    }
  }, [setLastVisitedControlPage, lastVisitedControlPage.detail, router]);

  const fetchDispatchData = useCallback(async () => {
    const { error, results } = await DispatchNumberApi.search({
      request: searchParams,
    });

    if (error) throw new Error(error.type || "데이터 가져오기 중 오류 발생");
    return results as DispatchData;
  }, [searchParams]);

  const {
    data: displayData = { inProgress: 0, waiting: 0, completed: 0, results: [] },
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["dispatchData", searchParams],
    queryFn: fetchDispatchData,
    refetchOnWindowFocus: false,
    retry: 3,
  });

  useEffect(() => {
    if (displayData.results.length > 0) {
      setSearchData(displayData.results);
    }
  }, [displayData, setSearchData]);

  const handleSelectedItemsCountChange = useCallback((count: number) => setSelectedItemsCount(count), []);
  const handleSelectedDispatchIdsChange = useCallback((ids: number[]) => setSelectedDispatchIds(ids), []);

  const handleStateChange = (state: "IN_TRANSIT" | "WAITING" | "COMPLETED") => {
    setSelectedState(state === "IN_TRANSIT" ? "주행중" : state === "WAITING" ? "주행대기" : "주행완료");
    setSearchParams((prev: SearchParams) => ({ ...prev, status: state }));
  };

  const getCurrentCount = (data: DispatchData) => {
    switch (selectedState) {
      case "주행중":
        return data.inProgress;
      case "주행대기":
        return data.waiting;
      case "주행완료":
        return data.completed;
      default:
        return 0;
    }
  };

  const handleSearch = async () => {
    let formattedStartDate = todayDate;
    let formattedEndDate = sevenDaysLater;

    if (startDate && dayjs(startDate).isValid()) {
      formattedStartDate = dayjs(startDate).format("YYYY-MM-DDTHH:mm:ss");
    }
    if (endDate && dayjs(endDate).isValid()) {
      formattedEndDate = dayjs(endDate).format("YYYY-MM-DDTHH:mm:ss");
    }

    setSearchParams({
      status: selectedState === "주행중" ? "IN_TRANSIT" : selectedState === "주행대기" ? "WAITING" : "COMPLETED",
      isManager: false,
      startDateTime: formattedStartDate,
      endDateTime: formattedEndDate,
      searchOption: searchOption || "",
      searchKeyword,
    });
  };

  const handleClearSearch = () => {
    setSearchParams({
      status: selectedState === "주행중" ? "IN_TRANSIT" : selectedState === "주행대기" ? "WAITING" : "COMPLETED",
      isManager: false,
      startDateTime: todayDate,
      endDateTime: sevenDaysLater,
      searchOption: "",
      searchKeyword: "",
    });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  return (
    <div className="h-[calc(100vh-104px)] overflow-y-auto p-[48px]">
      <h1 className="mb-[24px] text-H-28-B">차량 관제</h1>
      <div className="flex flex-col gap-[28px] pl-[10px]">
        <SearchBars
          onSearch={handleSearch}
          onClear={handleClearSearch}
          todayDate={todayDate}
          sevenDaysLater={sevenDaysLater}
        />
        <TabForDispatchedList
          data={{
            inProgress: displayData.inProgress || 0,
            waiting: displayData.waiting || 0,
            completed: displayData.completed || 0,
          }}
          onStateChange={handleStateChange}
          initialState={
            selectedState === "주행중" ? "IN_TRANSIT" : selectedState === "주행대기" ? "WAITING" : "COMPLETED"
          }
        />
        <ListSelectionCount
          currentCount={getCurrentCount(displayData)}
          selectedCount={selectedItemsCount}
          selectedDispatchIds={selectedDispatchIds}
          refreshData={refetch}
        />
        <DispatchLists
          inProgress={displayData.inProgress || 0}
          waiting={displayData.waiting || 0}
          completed={displayData.completed || 0}
          results={displayData.results || []}
          onSelectedItemsCountChange={handleSelectedItemsCountChange}
          onSelectedDispatchIdsChange={handleSelectedDispatchIdsChange}
        />
        <div className="flex justify-start">
          <Pagination
            currentPage={page}
            totalItems={displayData.results ? displayData.results.length : 0}
            onPageChange={setPage}
          />
        </div>
      </div>
    </div>
  );
};

export default ControlPage;
