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
  const waypointGroups =
    fetchedData?.dispatchList?.map((dispatch) => {
      return [
        { lat: fetchedData?.startStopover?.lat ?? 0, lng: fetchedData?.startStopover?.lon ?? 0 },
        ...dispatch.coordinates,
      ];
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
        <div className="w-full">{/* <NaverMap waypointGroups={waypointGroups} /> */}</div>
      </div>
    </>
  );
};

export default ControlDetailPage;
