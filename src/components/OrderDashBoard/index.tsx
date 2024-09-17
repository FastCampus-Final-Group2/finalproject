"use client";

import TotalOrder from "@/components/OrderDashBoard/TotalOrder";
import DriverList from "@/components/OrderDashBoard/DriverList";
import PendingOrderList from "@/components/OrderDashBoard/PendingOrderList";
import SideTapDriverDetail from "@/components/SideTapDriverDetail";
import { DragDropContext } from "react-beautiful-dnd";
import { useRecoilState, useRecoilValue } from "recoil";
import ToggleExpandSwitch from "@/components/core/ToggleExpandSwitch";
import {
  dispatchDataState,
  pendingOrderDataState,
  selectedDriverState,
  stopOverListSelector,
} from "@/atoms/dispatchData";
import { DispatchUpdateResponse, LocalTime, DispatchResponse } from "@/models/ApiTypes";
import axios from "@/utils/axios";
import { requestBodyChangeDispatchDataState } from "@/atoms/requestBodyChangeDispatchData";
import { useEffect, useState } from "react";

interface RequestBodyChangeDispatchData {
  smId: number | null;
  smIdList: (number | null)[];
  totalVolume: number | null; // 수정: number | null
  totalWeight: number | null; // 수정: number | null
  loadingStartTime: string | null;
  orderList: {
    roadAddress: string | null;
    detailAddress: string | null;
    volume: number | null;
    weight: number | null;
    lat: number | null;
    lon: number | null;
    expectedServiceDuration: number | null;
    serviceRequestDate: string | null;
    serviceRequestTime: LocalTime | null;
  }[];
}

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
  const selectedDriver = useRecoilValue(selectedDriverState);

  const [requestBodyChangeDispatchData, setRequestBodyChangeDispatchData] = useRecoilState(
    requestBodyChangeDispatchDataState,
  );

  const [apiResponseData, setApiResponseData] = useState(null); // 응답 데이터를 저장할 상태

  // // 객체 변화 후 API 요청을 보낼 상태 값
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  useEffect(() => {
    const updatedRequestBodyChangeDispatchData: RequestBodyChangeDispatchData = {
      smId: dispatchData?.course?.[selectedDriver]?.smId ?? null,
      smIdList: dispatchData?.course?.map((course) => course.smId ?? null) ?? [],
      totalVolume: dispatchData?.totalVolume ?? null, // 수정: null로 기본값 설정
      totalWeight: dispatchData?.totalWeight ?? null, // 수정: null로 기본값 설정
      loadingStartTime: dispatchData?.loadingStartTime ?? null,
      orderList: stopOverList
        .filter(
          (courseDetail) =>
            courseDetail.roadAddress && courseDetail.lat !== undefined && courseDetail.lon !== undefined,
        )
        .map((courseDetail) => ({
          roadAddress: courseDetail.roadAddress ?? null,
          detailAddress: courseDetail.detailAddress ?? null,
          volume: courseDetail.volume ?? null,
          weight: courseDetail.weight ?? null,
          lat: courseDetail.lat ?? null,
          lon: courseDetail.lon ?? null,
          expectedServiceDuration: courseDetail.expectedServiceDuration ?? null,
          serviceRequestDate: courseDetail.serviceRequestDate ?? null,
          serviceRequestTime: courseDetail.serviceRequestTime ?? null,
        })),
    };

    // 전역 상태 업데이트
    setRequestBodyChangeDispatchData(updatedRequestBodyChangeDispatchData);
    setShouldSendRequest(true);
  }, [stopOverList, dispatchData, selectedDriver]);

  // useEffect(() => {
  //   if (dispatchData && dispatchData.course?.[selectedDriver]?.courseDetailResponseList) {
  //     setStopOverList(dispatchData.course[selectedDriver].courseDetailResponseList);
  //   }
  // }, [dispatchData, selectedDriver]);

  // // restingPosition 값 앞에 새로운 객체 삽입
  // const insertBreakTime = (restingPosition: number, breakStartTime: LocalTime, breakEndTime: LocalTime) => {
  //   setStopOverList((prevData) => {
  //     const updatedData = [...prevData];
  //     const breakTimeObject = { breakStartTime, breakEndTime };
  //     updatedData.splice(restingPosition, 0, breakTimeObject); // 해당 위치에 새로운 객체 삽입
  //     return updatedData;
  //   });
  // };

  // useEffect(() => {
  //   if (
  //     dispatchData &&
  //     dispatchData.course?.[selectedDriver]?.breakStartTime &&
  //     dispatchData.course?.[selectedDriver]?.breakEndTime
  //   ) {
  //     const restingPosition = dispatchData.course[selectedDriver].restingPosition;
  //     const breakStartTime = dispatchData.course[selectedDriver].breakStartTime;
  //     const breakEndTime = dispatchData.course[selectedDriver].breakEndTime;

  //     // 조건문을 사용하여 `undefined`를 처리
  //     if (restingPosition !== undefined && breakStartTime !== undefined && breakEndTime !== undefined) {
  //       insertBreakTime(restingPosition, breakStartTime, breakEndTime);
  //     }
  //   }
  // }, [selectedDriver, dispatchData]);

  // 데이터 업데이트 함수
  const updateDispatchData = (
    prevData: DispatchResponse | null,
    newData: DispatchUpdateResponse,
    selectedDriver: number,
  ): DispatchResponse | null => {
    if (!prevData) return null; // prevData가 null일 경우 처리

    const dispatchDetailList = newData.dispatchDetailList ?? [];

    return {
      ...prevData,
      course: prevData.course.map(
        (course, index) =>
          index === selectedDriver // selectedDriver 인덱스가 일치하는 경우만 업데이트
            ? {
                ...course,
                mileage: newData.mileage ?? course.mileage,
                totalTime: newData.totalTime ?? course.totalTime,
                totalOrderOrDistanceNum: newData.totalOrderOrDistanceNum ?? course.totalOrderOrDistanceNum,
                floorAreaRatio: newData.floorAreaRatio ?? course.floorAreaRatio,
                availableNum: newData.availableNum ?? course.availableNum,
                breakStartTime: newData.breakStartTime ?? course.breakStartTime,
                breakEndTime: newData.breakEndTime ?? course.breakEndTime,
                restingPosition: newData.restingStopover ?? course.restingPosition,
                courseDetailResponseList: course.courseDetailResponseList.map((detail, idx) => ({
                  ...detail,
                  expectationOperationStartTime:
                    dispatchDetailList[idx]?.expectationOperationStartTime ?? detail.expectationOperationStartTime,
                  expectationOperationEndTime:
                    dispatchDetailList[idx]?.expectationOperationEndTime ?? detail.expectationOperationEndTime,
                  ett: dispatchDetailList[idx]?.ett ?? detail.ett,
                  expectedServiceDuration:
                    dispatchDetailList[idx]?.expectedServiceDuration ?? detail.expectedServiceDuration,
                  distance: dispatchDetailList[idx]?.distance ?? detail.distance,
                  delayRequestTime: dispatchDetailList[idx]?.delayRequestTime ?? detail.delayRequestTime,
                  overContractNum: dispatchDetailList[idx]?.overContractNum ?? detail.overContractNum,
                  overFloorAreaRatio: dispatchDetailList[idx]?.overFloorAreaRatio ?? detail.overFloorAreaRatio,
                  entryRestricted: dispatchDetailList[idx]?.entryRestricted ?? detail.entryRestricted,
                })),
                coordinatesResponseList:
                  newData.coordinates?.map((coord) => ({
                    lat: coord.lat,
                    lon: coord.lon,
                  })) ?? course.coordinatesResponseList,
              }
            : course, // selectedDriver가 아닌 경우 그대로 유지
      ),
      coordinatesResponseList:
        newData.coordinates?.map((coord) => ({
          lat: coord.lat,
          lon: coord.lon,
        })) ?? prevData.coordinatesResponseList,
    };
  };

  // apiResponseData가 변경될 때 상태 업데이트
  useEffect(() => {
    if (apiResponseData) {
      setDispatchData((prevDispatchData) => updateDispatchData(prevDispatchData, apiResponseData, selectedDriver));
    }
  }, [apiResponseData, selectedDriver, setDispatchData]);
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

  // useEffect 수정
  useEffect(() => {
    if (shouldSendRequest) {
      const sendRequest = async () => {
        try {
          const response = await axios.put("/dispatch", requestBodyChangeDispatchData);
          if (response.status === 200 || response.status === 201) {
            console.log("성공적인 응답:", response.data);
            setApiResponseData(response.data);
          }
        } catch (error) {
          console.error("드래그 앤 드롭 요청 오류:", error);
        }
      };

      sendRequest().catch((error) => {
        console.error("Promise 처리 중 에러:", error);
      });

      setShouldSendRequest(false);
    }
  }, [shouldSendRequest, requestBodyChangeDispatchData]);

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
          <SideTapDriverDetail isExpanded={isExpanded} toggleExpand={toggleExpand} />
        </div>
      </div>
      {/* 변경된 배열 확인 */}
      <div>
        <h2>StopOverData 배열:</h2>
        <pre>{JSON.stringify(stopOverList, null, 2)}</pre>
      </div>

      {/* <div>
        <h2>PendingOrderData 배열:</h2>
        <pre>{JSON.stringify(pendingOrderData, null, 2)}</pre>
      </div> */}
      {/* <div>
        <h3>트루:</h3>
        <pre>{JSON.stringify(shouldSendRequest, null, 2)}</pre>
      </div> */}
      <div>
        <pre>{JSON.stringify(requestBodyChangeDispatchData, null, 2)}</pre>
      </div>
      <div>
        <h2>API 응답 데이터:</h2>
        <pre>{apiResponseData ? JSON.stringify(apiResponseData, null, 2) : "데이터가 없습니다"}</pre>
      </div>
      <div>
        <pre>{JSON.stringify(dispatchData, null, 2)}</pre>
      </div>
    </DragDropContext>
  );
};

export default OrderDashBoard;
