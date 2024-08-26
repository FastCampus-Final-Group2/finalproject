import { useState, useEffect } from "react";
import ListHeader from "./ListHeader";
import Lists from "./Lists";

interface DispatchListsProps {
  data: {
    inProgress: number;
    waiting: number;
    completed: number;
    results: {
      progress: number;
      diapatchCode: string;
      dispatchName: string;
      startDateTime: string;
      totalOrder: number;
      smNum: number;
      manager: string;
    }[];
  };
}

const DispatchLists = ({ data }: DispatchListsProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [checkedItems, setCheckedItems] = useState<boolean[]>(new Array(data.results.length).fill(false));
  const [isAllChecked, setIsAllChecked] = useState(false);

  const perPage = 10;
  const startIndex = (currentPage - 1) * perPage;
  const endIndex = startIndex + perPage;
  const currentResults = data.results.slice(startIndex, endIndex);

  const emptyItem = {
    progress: 0,
    diapatchCode: "",
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

  // 페이지가 변경될 때 체크박스 초기화
  useEffect(() => {
    setCheckedItems(new Array(data.results.length).fill(false));
    setIsAllChecked(false);
  }, [currentPage, data.results.length]);

  const handleCheckBoxChange = (index: number) => {
    const updatedCheckedItems = [...checkedItems];
    updatedCheckedItems[startIndex + index] = !updatedCheckedItems[startIndex + index];
    setCheckedItems(updatedCheckedItems);
    setIsAllChecked(updatedCheckedItems.slice(startIndex, endIndex).every((item) => item));
  };

  const handleAllCheck = (isChecked: boolean) => {
    const updatedCheckedItems = [...checkedItems];
    for (let i = startIndex; i < endIndex; i++) {
      updatedCheckedItems[i] = isChecked;
    }
    setCheckedItems(updatedCheckedItems);
    setIsAllChecked(isChecked);
  };

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
