"use client";

import { useQuery } from "@tanstack/react-query";
import { useState, useEffect, useCallback } from "react";
import { DispatchNumberApi } from "@/apis/dispatches/dispatchNumber";
import { DispatchResult } from "@/models/ApiTypes";
import DispatchLists from "@/components/Dispatchlists";
import TabForDispatchedList from "@/components/TabForDispatchedList";
import SearchBars from "@/components/SearchBar";
import Pagination from "@/components/core/Pagination";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { lastVisitedControlPageState } from "@/atoms/control";
import { useRouter } from "next/navigation";
import ListSelectionCount from "@/components/ListSelectionCount";

/* todos: 
  // 0. 탭 전환 시에도 페이지 유지할 수 있게 하기(뒤로가기를 해서 control page로 돌아갈 수 있게 해야 함.)
  0-1. 탭 전환 시 페이지의 데이터 유지하기
  1. 검색 페이지 상태 관리 한쪽으로 모아 두기, 검색 결과 list 페이지에 뿌려줄 수 있게 하기(useDebounce 사용? 상태관리를 수정해서 검색 시 빈값을 가져와 모든 데이터를 뿌리는 일이 없게 하기)
  // 2. 배차 취소 구현(아마 제일 쉬움)
  3. 이슈상황 모아보기 작업하기(목록을 클릭해서 사이드탭을 열면 특정 listcard가 포커스되고 bg 색상이 연빨강으로 변함)
  // 4. 지도 컴포넌트에 좌표 뿌리기
  5. 사이드탭 열었을 때 순서 아이콘 표시하기
  6. 사이드탭 열었을 때 휴식 중 컴포넌트 넣는 방법 생각하기
  7. 예정 시간을 지나치면 작업 속도 늦어짐 메시지를 넣어야 하나?
  8. UT 플로우를 따를 때 운송 목록이 지정된 시간을 지나치면 자동으로 컴포넌트가 바뀌어야 하는지 물어보기
  // 9. DeliveryProgressSideTab의 refetch가 DeliveryProgressSideTab, DeliveryRoutine을 통해 차례로 전달되고, SelectDelivery에서 '배송취소' 버튼을 클릭하면 api가 작동하면서 DeliveryProgressSideTab을 새로고침해야 해.
  10. 특정 운송 목록을 취소할 때 대시보드와 사이드바가 모두 새로고침되게 하기
*/

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
  const setLastVisitedControlPage = useSetRecoilState(lastVisitedControlPageState);
  const lastVisitedControlPage = useRecoilValue(lastVisitedControlPageState);
  const router = useRouter();

  useEffect(() => {
    setLastVisitedControlPage((prev) => ({ ...prev, general: "/control" }));

    if (lastVisitedControlPage.detail) {
      router.push(lastVisitedControlPage.detail);
    }
  }, [setLastVisitedControlPage, lastVisitedControlPage.detail, router]);

  const [selectedState, setSelectedState] = useState<"IN_TRANSIT" | "WAITING" | "COMPLETED">("IN_TRANSIT");
  const [page, setPage] = useState(1);
  const [selectedItemsCount, setSelectedItemsCount] = useState(0);
  const [searchResults, setSearchResults] = useState<DispatchResult[]>([]);
  const [selectedDispatchIds, setSelectedDispatchIds] = useState<number[]>([]);

  const {
    data: fetchedData = {
      inProgress: 0,
      waiting: 0,
      completed: 0,
      results: [] as DispatchResult,
    } as DispatchData,
    isLoading,
    error,
    refetch,
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

  const handleSelectedItemsCountChange = useCallback((count: number) => {
    setSelectedItemsCount(count);
  }, []);

  const handleSelectedDispatchIdsChange = useCallback((ids: number[]) => {
    setSelectedDispatchIds(ids);
  }, []);

  // 로딩 중이거나 에러 발생 시 처리
  if (isLoading) return <div>Loading...</div>;
  if (error instanceof Error) return <div>Error: {error.message}</div>;

  const handleStateChange = (state: "IN_TRANSIT" | "WAITING" | "COMPLETED") => {
    setSelectedState(state);
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

        <ListSelectionCount
          currentCount={getCurrentCount()}
          selectedCount={selectedItemsCount}
          selectedDispatchIds={selectedDispatchIds}
          refreshData={refetch}
        />
        <DispatchLists
          inProgress={fetchedData.inProgress}
          waiting={fetchedData.waiting}
          completed={fetchedData.completed}
          results={searchResults.length > 0 ? searchResults : fetchedData.results}
          onSelectedItemsCountChange={handleSelectedItemsCountChange}
          onSelectedDispatchIdsChange={handleSelectedDispatchIdsChange}
        />
        <div className="flex justify-start">
          <Pagination currentPage={page} totalItems={fetchedData.results?.length} onPageChange={setPage} />
        </div>
      </div>
    </div>
  );
};

export default ControlPage;
