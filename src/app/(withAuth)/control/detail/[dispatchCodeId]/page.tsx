"use client";

import ControlDispatchHeader from "@/components/ControlDispatchHeader";
import ControlDispatchDashboard from "@/components/ControlDispatchDashboard";
import NaverMap from "@/components/NaverMapForControlDetail";
import { DispatchNumberApi } from "@/apis/dispatches/dispatchNumber";
import { DispatchListResponse } from "@/models/ApiTypes";
import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { lastVisitedControlPageState } from "@/atoms/control";
import { useEffect } from "react";

type ColorType = "lime" | "sky" | "violet" | "redwood" | "peanut" | "brown" | "forest" | "yale" | "olive";

interface FetchData extends DispatchListResponse {
  dispatchList: {
    coordinates: {
      lat: number;
      lng: number;
    }[];
  }[];
}

const fetchDispatchCodeIdData = async (dispatchCodeId: number): Promise<FetchData> => {
  const response = await DispatchNumberApi.dispatchCodeIdVehicleControl(dispatchCodeId);
  if ("error" in response) {
    throw new Error("dispatchCodeID 데이터 불러오기 실패");
  }
  return response as FetchData;
};

const ColorTypes: ColorType[] = ["lime", "sky", "violet", "redwood", "peanut", "brown", "forest", "yale", "olive"];

const ControlDetailPage = ({ params }: { params: { dispatchCodeId: number } }) => {
  const { dispatchCodeId } = params;
  const setLastVisitedControlPage = useSetRecoilState(lastVisitedControlPageState);

  useEffect(() => {
    setLastVisitedControlPage((prev) => ({
      ...prev,
      detail: `/control/detail/${params.dispatchCodeId}`,
    }));
  }, [params.dispatchCodeId, setLastVisitedControlPage]);

  const {
    data: fetchedData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["vehicle-control", dispatchCodeId],
    queryFn: () => fetchDispatchCodeIdData(dispatchCodeId),
    retry: 3,
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {(error as Error).message}</div>;

  console.log("대시보드 데이터", fetchedData);
  // 출발 센터 좌표와 도착지 좌표를 포함한 좌표 배열 생성
  // coordinates는 경로 -> 선으로 표시
  // fetchedData?.startStopover는 출발지 -> 깃발 아이콘을 달 것
  // fetchedData?.stopoverList는 경유지 -> 마커 아이콘을 달 것
  const waypointGroups =
    fetchedData?.dispatchList?.map((dispatch, index) => {
      return {
        id: index + 1,
        bgColor: ColorTypes[index % ColorTypes.length],
        waypoints: [
          { lon: fetchedData?.startStopover?.lon ?? 0, lat: fetchedData?.startStopover?.lat ?? 0 },
          ...dispatch.coordinates,
        ],
      };
    }) ?? [];

  console.log("waypointGroups", waypointGroups);
  return (
    <>
      <ControlDispatchHeader fetchedData={fetchedData!} />
      <div className="flex w-full">
        <ControlDispatchDashboard
          fetchedData={fetchedData!}
          refreshData={async () => {
            await refetch();
          }}
        />
        <div className="w-full">
          <NaverMap waypointGroups={waypointGroups} />
        </div>
      </div>
    </>
  );
};

export default ControlDetailPage;
