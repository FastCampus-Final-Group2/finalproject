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
} from "@/atoms/control";
import { useRouter } from "next/navigation";
import ListSelectionCount from "@/components/ListSelectionCount";
import dayjs from "dayjs";

/* todos: 
  // 0. 탭 전환 시에도 페이지 유지할 수 있게 하기(뒤로가기를 해서 control page로 돌아갈 수 있게 해야 함.)
  // 0-1. 탭 전환 시 control 페이지의 데이터 유지하기
  // 0-2. 탭 전환 시 control detail 페이지의 데이터 유지하기
  0-3. 날짜 검색 가능하게 만들기
  // 1. 검색 페이지 상태 관리 한쪽으로 모아 두기, 검색 결과 list 페이지에 뿌려줄 수 있게 하기
  // 1-1. useDebounce 사용? 상태관리를 수정해서 검색 시 빈값을 가져와 모든 데이터를 뿌리는 일이 없게 하기
  1-2. 배차 강제 종료 시 삭제한 목록이 화면이 보이지 않게 하기
  1-3. 검색 후 탭 전환 시 탭에 해당하는 결과물이 보이게 하기
  // 2. 배차 취소 구현(아마 제일 쉬움)
  3. 이슈상황 모아보기 작업하기(목록을 클릭해서 사이드탭을 열면 특정 listcard가 포커스되고 bg 색상이 연빨강으로 변함)
  // 4. 지도 컴포넌트에 좌표 뿌리기
  5. 사이드탭 열었을 때 순서 아이콘 표시하기
  6. 사이드탭 열었을 때 휴식 중 컴포넌트 넣는 방법 생각하기
  7. 예정 시간을 지나치면 작업 속도 늦어짐 메시지를 넣어야 하나?
  8. UT 플로우를 따를 때 운송 목록이 지정된 시간을 지나치면 자동으로 컴포넌트가 바뀌어야 하는지 물어보기
  // 9. DeliveryProgressSideTab의 refetch가 DeliveryProgressSideTab, DeliveryRoutine을 통해 차례로 전달되고, SelectDelivery에서 '배송취소' 버튼을 클릭하면 api가 작동하면서 DeliveryProgressSideTab을 새로고침해야 해.
  10. 특정 운송 목록을 취소할 때 대시보드와 사이드바가 모두 새로고침되게 하기?
  11.휴식 중 컴포넌트 수정
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

const fetchDispatchData = async ({ queryKey }: { queryKey: [string, "IN_TRANSIT" | "WAITING" | "COMPLETED"] }) => {
  const status = queryKey[1];
  const { error, results } = await DispatchNumberApi.search({
    request: {
      status,
      isManager: false,
      startDateTime: "1900-01-01T23:59:59",
      endDateTime: "3000-12-31T23:59:59",
      searchOption: "",
      searchKeyword: "",
    },
  });

  if (error) throw new Error(error.type || "데이터 가져오기 중 오류 발생");
  return results as DispatchData;
};

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
    let formattedStartDate = "1900-01-01T00:00:00";
    let formattedEndDate = "3000-12-31T23:59:59";

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
      startDateTime: "1900-01-01T00:00:00",
      endDateTime: "3000-12-31T23:59:59",
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
        <SearchBars onSearch={handleSearch} onClear={handleClearSearch} />
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
