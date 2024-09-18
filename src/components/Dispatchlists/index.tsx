import { useState, useEffect, useCallback, useMemo } from "react";
import ListHeader from "./ListHeader";
import Lists from "./Lists";
import { DispatchResult } from "@/models/ApiTypes";

interface DispatchListsProps {
  inProgress: number;
  waiting: number;
  completed: number;
  results: DispatchResult[];
  onSelectedItemsCountChange: (count: number) => void;
  onSelectedDispatchIdsChange: (ids: number[]) => void;
}

const DispatchLists = ({ results, onSelectedItemsCountChange, onSelectedDispatchIdsChange }: DispatchListsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(results.length).fill(false));
  const [isAllChecked, setIsAllChecked] = useState(false);

  const perPage = 10;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const sortedResults = useMemo(() => {
    return [...results].sort((a, b) => {
      if (!a.startDateTime || !b.startDateTime) return 0;
      return new Date(b.startDateTime).getTime() - new Date(a.startDateTime).getTime();
    });
  }, [results]);

  const currentResults = sortedResults.slice(startIndex, endIndex);

  const emptyItem = {
    progress: 0,
    dispatchCode: "",
    dispatchName: "",
    startDateTime: "",
    totalOrder: 0,
    smNum: 0,
    manager: "",
  };

  const filledResults = [...currentResults, ...Array(perPage - currentResults.length).fill(emptyItem)].slice(
    0,
    perPage,
  );

  const initializeCheckStatus = useCallback(() => {
    setCheckedItems(new Array(sortedResults.length).fill(false));
    setIsAllChecked(false);
  }, [sortedResults.length]);

  useEffect(() => {
    initializeCheckStatus();
  }, [initializeCheckStatus]);

  // 페이지가 변경될 때 체크박스 초기화
  useEffect(() => {
    initializeCheckStatus();
  }, [currentPage, results.length, initializeCheckStatus]);

  const updateAllCheckedStatus = (updatedCheckedItems: boolean[]) => {
    // 현재 페이지의 모든 항목이 체크되었는지 확인
    const allChecked = updatedCheckedItems.slice(startIndex, endIndex).every((item) => item);
    setIsAllChecked(allChecked);
  };

  const handleCheckBoxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[startIndex + index] = !updatedCheckedItems[startIndex + index];
    setCheckedItems(updatedCheckedItems);
    updateAllCheckedStatus(updatedCheckedItems); // 항목 체크 후 전체 체크 상태 업데이트
  };

  const handleAllCheck = (isChecked: boolean) => {
    const updatedCheckedItems = [...checkedItems];

    // 현재 페이지에서 빈 항목을 제외하고 처리
    for (let i = startIndex; i < endIndex; i++) {
      if (results[i] && results[i].dispatchCode) {
        updatedCheckedItems[i] = isChecked;
      }
    }

    setCheckedItems(updatedCheckedItems);
    setIsAllChecked(isChecked);
  };

  useEffect(() => {
    const selectedCount = checkedItems.filter(Boolean).length;
    onSelectedItemsCountChange(selectedCount);

    const selectedIds = sortedResults
      .filter((_, index) => checkedItems[index])
      .map((result) => result.dispatchNumberId)
      .filter((id): id is number => id !== undefined);
    onSelectedDispatchIdsChange(selectedIds);
  }, [checkedItems, sortedResults, onSelectedItemsCountChange, onSelectedDispatchIdsChange]);

  return (
    <div>
      <ListHeader isAllChecked={isAllChecked} onAllCheck={handleAllCheck} />
      <Lists
        results={filledResults}
        checkedItems={checkedItems.slice(startIndex, endIndex)}
        onCheckBoxChange={handleCheckBoxChange}
      />
    </div>
  );
};

export default DispatchLists;
