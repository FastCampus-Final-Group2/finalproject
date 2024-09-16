"use client";

import TotalOrder from "@/components/OrderDashBoard/TotalOrder";
import DriverList from "@/components/OrderDashBoard/DriverList";
import PendingOrderList from "@/components/OrderDashBoard/PendingOrderList";
import SideTapDriverDetail from "@/components/SideTapDriverDetail";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import { dispatchDataState, pendingOrderDataState, stopOverListSelector } from "@/atoms/dispatchData";
import { LocalTime } from "@/models/ApiTypes";
import axios from "@/utils/axios";
import { requestBodyChangeDispatchDataState } from "@/atoms/requestBodyChangeDispatchData";
import { useEffect, useState } from "react";

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
  const { isExpanded, toggleExpand } = ToggleExpandSwitch(false);

  const [dispatchData, setDispatchData] = useRecoilState(dispatchDataState);
  const [pendingOrderData, setPendingOrderData] = useRecoilState(pendingOrderDataState);
  const [stopOverList, setStopOverList] = useRecoilState(stopOverListSelector);

  const [requestBodyChangeDispatchData, setRequestBodyChangeDispatchData] = useRecoilState(
    requestBodyChangeDispatchDataState,
  );

  const [apiResponseData, setApiResponseData] = useState(null); // 응답 데이터를 저장할 상태
  const [requestData, setRequestData] = useState(null); // 요청 데이터를 상태로 관리

  // // 객체 변화 후 API 요청을 보낼 상태 값
  // const [shouldSendRequest, setShouldSendRequest] = useState(false);
  // useEffect(() => {
  //   const updatedRequestBodyChangeDispatchData = {
  //     smId: recoilDispatchData?.course?.[driverIndexState]?.smId ?? null,
  //     smIdList: recoilDispatchData?.course?.map((course) => course.smId),
  //     totalVolume: recoilDispatchData?.totalVolume,
  //     totalWeight: recoilDispatchData?.totalWeight,
  //     loadingStartTime: recoilDispatchData?.loadingStartTime ?? "",
  //     orderList: listStopOverData
  //       .filter((courseDetail) => courseDetail.roadAddress && courseDetail.lat && courseDetail.lon)
  //       .map((courseDetail) => ({
  //         roadAddress: courseDetail.roadAddress,
  //         detailAddress: courseDetail.detailAddress,
  //         volume: courseDetail.volume,
  //         weight: courseDetail.weight,
  //         lat: courseDetail.lat,
  //         lon: courseDetail.lon,
  //         expectedServiceDuration: courseDetail.expectedServiceDuration,
  //         serviceRequestDate: courseDetail.serviceRequestDate,
  //         serviceRequestTime: courseDetail.serviceRequestTime,
  //       })),
  //   };

  //   // 전역 상태 업데이트
  //   setRequestBodyChangeDispatchData(updatedRequestBodyChangeDispatchData);
  //   setShouldSendRequest(true);
  // }, [listStopOverData, recoilDispatchData, driverIndexState]);

  // useEffect(() => {
  //   if (recoilDispatchData && recoilDispatchData.course?.[driverIndexState]?.courseDetailResponseList) {
  //     setListStopOverData(recoilDispatchData.course[driverIndexState].courseDetailResponseList);
  //   }
  // }, [recoilDispatchData, driverIndexState]);

  // // restingPosition 값 앞에 새로운 객체 삽입
  // const insertBreakTime = (restingPosition: number, breakStartTime: LocalTime, breakEndTime: LocalTime) => {
  //   setListStopOverData((prevData) => {
  //     const updatedData = [...prevData];
  //     const breakTimeObject = { breakStartTime, breakEndTime };
  //     updatedData.splice(restingPosition, 0, breakTimeObject); // 해당 위치에 새로운 객체 삽입
  //     return updatedData;
  //   });
  // };

  // useEffect(() => {
  //   if (
  //     recoilDispatchData &&
  //     recoilDispatchData.course?.[driverIndexState]?.breakStartTime &&
  //     recoilDispatchData.course?.[driverIndexState]?.breakEndTime
  //   ) {
  //     const restingPosition = recoilDispatchData.course[driverIndexState].restingPosition;
  //     const breakStartTime = recoilDispatchData.course[driverIndexState].breakStartTime;
  //     const breakEndTime = recoilDispatchData.course[driverIndexState].breakEndTime;

  //     // 조건문을 사용하여 `undefined`를 처리
  //     if (restingPosition !== undefined && breakStartTime !== undefined && breakEndTime !== undefined) {
  //       insertBreakTime(restingPosition, breakStartTime, breakEndTime);
  //     }
  //   }
  // }, [driverIndexState, recoilDispatchData]);

  const onDragEnd = async (result: any) => {
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

  // useEffect(() => {
  //   if (shouldSendRequest) {
  //     const sendRequest = async () => {
  //       try {
  //         const response = await axios.put("/dispatch", requestBodyChangeDispatchData);
  //         if (response.status === 200 || response.status === 201) {
  //           console.log("성공적인 응답:", response.data);
  //           setApiResponseData(response.data);
  //           setRequestData(requestBodyChangeDispatchData);
  //           updateDispatchData(); // 데이터 업데이트 호출
  //         }
  //       } catch (error) {
  //         console.error("드래그 앤 드롭 요청 오류:", error);
  //       }
  //     };

  //     // Promise를 처리하기 위해 await 사용
  //     sendRequest().catch((error) => {
  //       console.error("Promise 처리 중 에러:", error);
  //     });

  //     setShouldSendRequest(false);
  //   }
  // }, [shouldSendRequest, requestBodyChangeDispatchData]);

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
            <DriverList />
          </div>
          <div className="mt-[20px] flex max-h-[364px] min-h-[64px] w-[524px] justify-center">
            <PendingOrderList pendingOrderData={pendingOrderData} />
          </div>
        </div>
        <div>
          <SideTapDriverDetail listStopOverData={stopOverList} isExpanded={isExpanded} toggleExpand={toggleExpand} />
        </div>
      </div>
      {/* 변경된 배열 확인 */}
      <div>
        <h2>StopOverData 배열:</h2>
        <pre>{JSON.stringify(stopOverList, null, 2)}</pre>
      </div>

      <div>
        <h2>PendingOrderData 배열:</h2>
        <pre>{JSON.stringify(pendingOrderData, null, 2)}</pre>
      </div>
      {/* <div>
        <h3>트루:</h3>
        <pre>{JSON.stringify(shouldSendRequest, null, 2)}</pre>
      </div> */}
      {/* <div>
        <h3>전송한 요청 데이터:</h3>
        <pre>{JSON.stringify(requestData, null, 2)}</pre>
      </div>
      <div>
        <pre>{JSON.stringify(requestBodyChangeDispatchData, null, 2)}</pre>
      </div>
      <div>
        <h2>API 응답 데이터:</h2>
        <pre>{apiResponseData ? JSON.stringify(apiResponseData, null, 2) : "데이터가 없습니다"}</pre>
      </div>
      <div>
        <pre>{JSON.stringify(dispatchData, null, 2)}</pre>
      </div> */}
    </DragDropContext>
  );
};

export default OrderDashBoard;
