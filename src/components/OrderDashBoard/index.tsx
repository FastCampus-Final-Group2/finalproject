"use client";

import { useState } from "react";
import TotalOrder from "@/components/OrderDashBoard/TotalOrder";
import DriverList from "@/components/OrderDashBoard/DriverList";
import PendingOrderList from "@/components/OrderDashBoard/PendingOrderList";
import SideTapDriverDetail from "@/components/SideTapDriverDetail";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import { dispatchDataState, pendingOrderDataState, stopOverListSelector } from "@/atoms/dispatchData";

// 리스트를 재정렬하는 함수
const reorder = (list: any[], startIndex: number, endIndex: number) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);
  return result;
};

// 리스트 간 데이터 이동 함수
const move = (source: any[], destination: any[], droppableSource: any, droppableDestination: any) => {
  const sourceClone = Array.from(source); // 원본 배열 복사
  const destClone = Array.from(destination); // 목적지 배열 복사
  const [removed] = sourceClone.splice(droppableSource.index, 1); // source에서 요소 제거
  destClone.splice(droppableDestination.index, 0, removed); // destination에 요소 추가

  return {
    source: sourceClone,
    destination: destClone,
  };
};

const OrderDashBoard = () => {
  const [isSideTapExpanded, setSideTapExpanded] = useState(false);
  const { isExpanded, toggleExpand } = ToggleExpandSwitch(false);

  const openSideTap = () => setSideTapExpanded(true);
  const closeSideTap = () => setSideTapExpanded(false);

  const [dispatchData, setDispatchData] = useRecoilState(dispatchDataState);
  const [pendingOrderData, setPendingOrderData] = useRecoilState(pendingOrderDataState);
  const [stopOverList, setStopOverList] = useRecoilState(stopOverListSelector);

  console.log(dispatchData);
  console.log(pendingOrderData);
  console.log(stopOverList);

  const onDragEnd = (result: any) => {
    if (!result.destination) return; // 목적지가 없으면 종료

    const { source, destination } = result;

    // 같은 리스트에서의 이동
    if (source.droppableId === destination.droppableId) {
      if (source.droppableId === "droppableStopOverData") {
        const reorderedData = reorder(stopOverList, source.index, destination.index);
        setStopOverList(reorderedData);
      } else if (source.droppableId === "droppablePendingOrderData") {
        const reorderedData = reorder(pendingOrderData, source.index, destination.index);
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
          const filteredData = Array.from(stopOverList).filter(
            (stopOver) => stopOver.restrictedTonCode || stopOver.delayRequestTime || stopOver.overContractNum,
          );
          const actualFilteredSource = filteredData[source.index]?.shipmentNumber;
          const actualFilteredDestination = filteredData[destination.index]?.shipmentNumber;

          // 원본 데이터에서 필터링된 데이터의 실제 인덱스를 찾음
          actualSourceIndex = stopOverList.findIndex((item) => item.shipmentNumber === actualFilteredSource);
          actualDestinationIndex = stopOverList.findIndex((item) => item.shipmentNumber === actualFilteredDestination);
        }

        // 재정렬 수행
        const reorderedData = reorder(stopOverList, actualSourceIndex, actualDestinationIndex);

        setStopOverList(reorderedData);
      }
    } else {
      // 리스트 간의 이동
      if (source.droppableId === "droppableStopOverData" && destination.droppableId === "droppablePendingOrderData") {
        // StopOverList -> PendingOrderList로 이동
        const { source: newStopOverData, destination: newPendingOrderData } = move(
          stopOverList,
          pendingOrderData,
          source,
          destination,
        );
        setStopOverList(newStopOverData);
        setPendingOrderData(newPendingOrderData); // Recoil 상태 업데이트
      } else if (
        source.droppableId === "droppablePendingOrderData" &&
        destination.droppableId === "droppableStopOverData"
      ) {
        // PendingOrderList -> StopOverList로 이동
        const { source: newPendingOrderData, destination: newStopOverData } = move(
          pendingOrderData,
          stopOverList,
          source,
          destination,
        );
        setPendingOrderData(newPendingOrderData); // Recoil 상태 업데이트
        setStopOverList(newStopOverData);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="flex">
        <div className="h-[884px] w-[524px] bg-blue-30">
          <div className="flex h-[156px] w-[524px] items-center justify-center">
            <TotalOrder
              totalOrders={dispatchData?.totalOrder}
              errorOrders={dispatchData?.totalErrorNum}
              estimatedTime={dispatchData?.totalTime}
              capacityRate={dispatchData?.totalFloorAreaRatio}
            />
          </div>
          <div className="flex h-[344px] w-[524px] justify-center">
            <DriverList onClickToggle={openSideTap} />
          </div>
          <div className="mt-[20px] flex max-h-[364px] min-h-[64px] w-[524px] justify-center">
            <PendingOrderList pendingOrderData={pendingOrderData} />
          </div>
        </div>
        <div>
          <SideTapDriverDetail
            isSideTapExpanded={isSideTapExpanded}
            onClose={closeSideTap}
            listStopOverData={stopOverList}
            isExpanded={isExpanded}
            toggleExpand={toggleExpand}
          />
        </div>
      </div>

      {/* 변경된 배열 확인 */}
      {/* <div>
        <h2>StopOverData 배열:</h2>
        <pre>{JSON.stringify(stopOverList, null, 2)}</pre>
      </div>

      <div>
        <h2>PendingOrderData 배열:</h2>
        <pre>{JSON.stringify(pendingOrderData, null, 2)}</pre>
      </div> */}
    </DragDropContext>
  );
};

export default OrderDashBoard;
