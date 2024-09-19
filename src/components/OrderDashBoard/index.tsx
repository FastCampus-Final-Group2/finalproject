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
import { DispatchUpdateResponse, LocalTime, DispatchResponse, CourseDetailResponse } from "@/models/ApiTypes";
import axios from "@/utils/axios";
import { requestBodyChangeDispatchDataState } from "@/atoms/requestBodyChangeDispatchData";
import { useEffect, useState } from "react";
import {
  plusMinusEstimatedTimetState,
  plusMinusTotalOrdertState,
  plusMinusVolumeState,
  plusMinusWeightState,
} from "@/atoms/plusMinus";

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
  const [prevRequestBody, setPrevRequestBody] = useState<RequestBodyChangeDispatchData | null>(null);

  const [plusMinusVolume, setPlusMinusVolume] = useRecoilState(plusMinusVolumeState);
  const [plusMinusWeight, setPlusMinusWeight] = useRecoilState(plusMinusWeightState);
  const [plusMinusTotalOrder, setPlusMinusTotalOrder] = useRecoilState(plusMinusTotalOrdertState);
  const [plusMinusEstimatedTime, setPlusMinusEstimatedTime] = useRecoilState(plusMinusEstimatedTimetState);

  // // 객체 변화 후 API 요청을 보낼 상태 값
  const [shouldSendRequest, setShouldSendRequest] = useState(false);
  useEffect(() => {
    const updatedRequestBodyChangeDispatchData: RequestBodyChangeDispatchData = {
      smId: dispatchData?.course?.[selectedDriver]?.smId ?? null,
      smIdList: dispatchData?.course?.map((course) => course.smId ?? null) ?? [],
      totalVolume: dispatchData?.totalVolume ?? 0 - plusMinusVolume ?? null, // 수정: null로 기본값 설정
      totalWeight: dispatchData?.totalWeight ?? 0 - plusMinusWeight ?? null, // 수정: null로 기본값 설정
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
          productQuantity: courseDetail.productQuantity ?? null,
          lat: courseDetail.lat ?? null,
          lon: courseDetail.lon ?? null,
          expectedServiceDuration: courseDetail.expectedServiceDuration ?? null,
          serviceRequestDate: courseDetail.serviceRequestDate ?? null,
          serviceRequestTime: courseDetail.serviceRequestTime ?? null,
        })),
    };

    // 전역 상태 업데이트
    // 이전 요청 본문과 현재 요청 본문을 비교
    if (JSON.stringify(updatedRequestBodyChangeDispatchData) !== JSON.stringify(prevRequestBody)) {
      setRequestBodyChangeDispatchData(updatedRequestBodyChangeDispatchData);
      setPrevRequestBody(updatedRequestBodyChangeDispatchData);
      setShouldSendRequest(true);
    }
  }, [stopOverList, dispatchData, selectedDriver]);

  useEffect(() => {
    if (!dispatchData || selectedDriver === -1) return;

    const restingPosition = dispatchData.course[selectedDriver]?.restingPosition;
    const breakStartTime = dispatchData.course[selectedDriver]?.breakStartTime;
    const breakEndTime = dispatchData.course[selectedDriver]?.breakEndTime;

    // 기존에 같은 인덱스에 휴게시간 객체가 있는지 확인하고 제거
    const filteredStopOverList = stopOverList.filter((item) => !(item.breakStartTime && item.breakEndTime));

    // 새로운 휴게시간 객체 생성
    const newBreakTimeObject = {
      breakStartTime,
      breakEndTime,
    };

    // 휴게시간 객체를 restingPosition 인덱스에 삽입
    const updatedStopOverList = [
      ...filteredStopOverList.slice(0, restingPosition),
      newBreakTimeObject,
      ...filteredStopOverList.slice(restingPosition),
    ];

    // stopOverList 배열 업데이트
    setStopOverList(updatedStopOverList as CourseDetailResponse[]);
  }, [selectedDriver]); // 감지할 상태 목록

  const updateDispatchData = (
    prevData: DispatchResponse | null,
    newData: DispatchUpdateResponse,
    selectedDriver: number,
  ): DispatchResponse | null => {
    if (!prevData) return null; // prevData가 null일 경우 처리

    const dispatchDetailList = newData.dispatchDetailList ?? [];

    return {
      ...prevData,
      totalFloorAreaRatio: newData.totalFloorAreaRatio,
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
                restingPosition: newData.restingStopover ?? course.restingPosition,
                courseDetailResponseList: (() => {
                  let dispatchIdx = 0; // dispatchDetailList의 인덱스를 관리하기 위한 변수

                  return course.courseDetailResponseList.map((detail) => {
                    // 휴게시간 객체를 건너뛰기 위한 조건
                    if (detail.breakStartTime && detail.breakEndTime) {
                      // 휴게시간 객체는 그대로 유지하고 dispatchIdx는 증가하지 않음
                      return detail;
                    }

                    // dispatchDetailList의 해당 인덱스 값으로 업데이트
                    const updatedDetail = {
                      ...detail,
                      expectationOperationStartTime:
                        dispatchDetailList[dispatchIdx]?.expectationOperationStartTime ??
                        detail.expectationOperationStartTime,
                      expectationOperationEndTime:
                        dispatchDetailList[dispatchIdx]?.expectationOperationEndTime ??
                        detail.expectationOperationEndTime,
                      ett: dispatchDetailList[dispatchIdx]?.ett ?? detail.ett,
                      expectedServiceDuration:
                        dispatchDetailList[dispatchIdx]?.expectedServiceDuration ?? detail.expectedServiceDuration,
                      distance: dispatchDetailList[dispatchIdx]?.distance ?? detail.distance,
                      delayRequestTime: dispatchDetailList[dispatchIdx]?.delayRequestTime ?? detail.delayRequestTime,
                      overContractNum: dispatchDetailList[dispatchIdx]?.overContractNum ?? detail.overContractNum,
                      overFloorAreaRatio:
                        dispatchDetailList[dispatchIdx]?.overFloorAreaRatio ?? detail.overFloorAreaRatio,
                      entryRestricted: dispatchDetailList[dispatchIdx]?.entryRestricted ?? detail.entryRestricted,
                    };

                    // 다음 dispatchDetailList 인덱스로 이동
                    dispatchIdx += 1;

                    return updatedDetail;
                  });
                })(),
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

  useEffect(() => {
    if (shouldSendRequest) {
      const sendRequest = async () => {
        try {
          const response = await axios.put("/dispatch", requestBodyChangeDispatchData);
          if (response.status === 200 || response.status === 201) {
            // 개발 모드에서만 로그 출력
            if (process.env.NODE_ENV === "development") {
              console.log("성공적인 응답:", response.data);
            }
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
        {dispatchData?.totalVolume}/{dispatchData?.totalWeight}
        <br></br>
        {plusMinusVolume}/{plusMinusWeight}
        <br></br>
        {plusMinusTotalOrder}
        <br></br>
        {plusMinusEstimatedTime}
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
        <h3>요청 데이터:</h3>
        <pre>{JSON.stringify(requestBodyChangeDispatchData, null, 2)}</pre>
      </div>
      <div>
        <h2>API 응답 데이터:</h2>
        <pre>{apiResponseData ? JSON.stringify(apiResponseData, null, 2) : "데이터가 없습니다"}</pre>
      </div>
      <div>
        <h2>원본 데이터:</h2>
        <pre>{JSON.stringify(dispatchData, null, 2)}</pre>
      </div>
    </DragDropContext>
  );
};

export default OrderDashBoard;
