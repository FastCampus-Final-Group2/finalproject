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
  2. 사이드탭 열었을 때 지도에 순서 아이콘 표시하기(1)
  3. 특정 운송 목록을 취소할 때 대시보드와 사이드바가 모두 새로고침되게 하기
  4. 이슈상황 모아보기 작업하기(목록을 클릭해서 사이드탭을 열면 특정 listcard가 포커스되고 bg 색상이 연빨강으로 변함. 이때 한 번 빨강으로 표시된 부분은 다음에는 더 이상 색상이 표시되지 않음)(2)
  // 5. 예정 시간을 지나치면 작업 속도 늦어짐 메시지를 넣어야 하나?
  // 6. UT 플로우를 따를 때 운송 목록이 지정된 시간을 지나치면 자동으로 컴포넌트가 바뀌어야 하는지 물어보기
  7. 탭 닫았다가 다시 열면 처음 상태로 돌아가기(useReset 추가)
  8. 팝업 내 설명 워딩 다른 내용 체크 (배송취소 팝업)
  9. 지도 확대 표시 바 지속적으로 보여지는 부분 수정
  10. 이슈 메모 저장 후 저장된 내용 출력 기능 재확인
  11. 배차 취소 했을 때 취소된 주문 타임라인 파란 아이콘으로 표시됨 + 취소 후에도 ‘선택된 주문 수’ 값 안에 포함되어있음→ 타인라임 컴포넌트 중 선택 불가 내용 색상 수정 & 선택된 주문 수 카운트 오류 수정
  12. 팝업에서 confirmed 미표시 → confirmed 문구&체크 박스 표시
  13. 새로고침 버튼 클릭 시 recoil reset
  14. 달력 선택 recoil status 만들기
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
