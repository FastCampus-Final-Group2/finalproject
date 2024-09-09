"use client";

import { useEffect, useState } from "react";
import TotalOrder from "@/components/OrderDashBoard/TotalOrder";
import DriverList from "@/components/OrderDashBoard/DriverList";
import PendingOrderList from "@/components/OrderDashBoard/PendingOrderList";
import SideTapDriverDetail from "@/components/SideTapDriverDetail";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { stopOverDataState, pendingOrderDataState } from "@/atoms/stopOverDataState";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";

// 리스트를 재정렬하는 함수
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// 리스트 간 데이터 이동 함수
const move = (source: any[], destination: any[], droppableSource: any, droppableDestination: any) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);
  destClone.splice(droppableDestination.index, 0, removed);

  return {
    source: sourceClone,
    destination: destClone,
  };
};

const OrderDashBoard = () => {
  const [isSideTapExpanded, setSideTapExpanded] = useState(false);
  const { isExpanded, toggleExpand } = ToggleExpandSwitch();

  const openSideTap = () => setSideTapExpanded(true);
  const closeSideTap = () => setSideTapExpanded(false);

  const [stopOverData, setStopOverData] = useRecoilState(stopOverDataState);
  const [pendingOrderData, setPendingOrderData] = useRecoilState(pendingOrderDataState);

  const [listStopOverData, setListStopOverData] = useState(stopOverData);
  const [listPendingOrderData, setListPendingOrderData] = useState(pendingOrderData);

  useEffect(() => {
    setListStopOverData(stopOverData);
    setListPendingOrderData(pendingOrderData);
  }, [stopOverData, pendingOrderData]);

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // 목적지가 없으면 종료

    const { source, destination } = result;

    // 같은 리스트에서의 이동
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "droppableStopOverData") {
        const reorderedData = reorder(listStopOverData, source.index, destination.index);
        setListStopOverData(reorderedData);
        setStopOverData(reorderedData); // Recoil 상태 업데이트
      } else if (source.droppableId === "droppablePendingOrderData") {
        const reorderedData = reorder(listPendingOrderData, source.index, destination.index);
        setListPendingOrderData(reorderedData);
        setPendingOrderData(reorderedData); // Recoil 상태 업데이트
      }
    }

    // 같은 리스트에서의 이동
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "droppableStopOverData") {
        let actualSourceIndex = source.index;
        let actualDestinationIndex = destination.index;

        if (isExpanded) {
          // 필터링된 상태일 때
          const filteredData = listStopOverData.filter((stopOver) => stopOver.warningCheck);
          const actualFilteredSource = filteredData[source.index]?.id;
          const actualFilteredDestination = filteredData[destination.index]?.id;

          // 원본 데이터에서 필터링된 데이터의 실제 인덱스를 찾음
          actualSourceIndex = listStopOverData.findIndex((item) => item.id === actualFilteredSource);
          actualDestinationIndex = listStopOverData.findIndex((item) => item.id === actualFilteredDestination);
        }

        // 재정렬 수행
        const reorderedData = reorder(listStopOverData, actualSourceIndex, actualDestinationIndex);
        setListStopOverData(reorderedData);
        setStopOverData(reorderedData); // Recoil 상태 업데이트
      }
    } else {
      // 리스트 간의 이동
      if (source.droppableId === "droppableStopOverData" && destination.droppableId === "droppablePendingOrderData") {
        // StopOverList -> PendingOrderList로 이동
        const { source: newStopOverData, destination: newPendingOrderData } = move(
          listStopOverData,
          listPendingOrderData,
          source,
          destination,
        );
        setListStopOverData(newStopOverData);
        setStopOverData(newStopOverData); // Recoil 상태 업데이트
        setListPendingOrderData(newPendingOrderData);
        setPendingOrderData(newPendingOrderData); // Recoil 상태 업데이트
      } else if (
        source.droppableId === "droppablePendingOrderData" &&
        destination.droppableId === "droppableStopOverData"
      ) {
        // PendingOrderList -> StopOverList로 이동
        const { source: newPendingOrderData, destination: newStopOverData } = move(
          listPendingOrderData,
          listStopOverData,
          source,
          destination,
        );
        setListPendingOrderData(newPendingOrderData);
        setPendingOrderData(newPendingOrderData); // Recoil 상태 업데이트
        setListStopOverData(newStopOverData);
        setStopOverData(newStopOverData); // Recoil 상태 업데이트
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex">
        <div className="h-[884px] w-[524px] bg-blue-30">
          <div className="flex h-[156px] w-[524px] items-center justify-center">
            <TotalOrder totalOrders={76} errorOrders={8} estimatedTime={16} capacityRate={90} />
          </div>
          <div className="flex h-[344px] w-[524px] justify-center">
            <DriverList onClickToggle={openSideTap} />
          </div>
          <div className="mt-[20px] flex max-h-[364px] min-h-[64px] w-[524px] justify-center">
            <PendingOrderList listPendingOrderData={listPendingOrderData} />
          </div>
        </div>
        <div>
          <SideTapDriverDetail
            isSideTapExpanded={isSideTapExpanded}
            onClose={closeSideTap}
            listStopOverData={listStopOverData}
            isExpanded={isExpanded}
            toggleExpand={toggleExpand}
          />
        </div>
      </div>
    </DragDropContext>
  );
};

export default OrderDashBoard;
