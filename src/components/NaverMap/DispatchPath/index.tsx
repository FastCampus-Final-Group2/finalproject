"use client";

import { useRecoilValue } from "recoil";
import { driverNumSelector } from "@/atoms/dispatchData";
import Polyline from "@/components/NaverMap/DispatchPath/Polyline";
import Markers from "@/components/NaverMap/DispatchPath/Markers";
import PendingMarker from "./Markers/PendingMarker";

interface DispatchPathProps {
  map: naver.maps.Map;
}

// 5 : 기사상세 배경컬러 & & 기사 상세 영역 닫기 버튼 default 배경컬러
// 10 : 용적률 원형 그래프 연한 컬러 & 기사 상세 영역 닫기 버튼 hovered 배경컬러
// 35 : 기사 경로 및 드라이버 리스트 구분 컬러
// 65 : 텍스트 컬러 & & 기사 상세 영역 닫기 버튼 아이콘 컬러

const DispatchPath = ({ map }: DispatchPathProps) => {
  const driverNum = useRecoilValue(driverNumSelector);

  return (
    <>
      {Array.from({ length: driverNum }).map((_, index) => {
        return <Polyline key={index} map={map} index={index} />;
      })}
      {Array.from({ length: driverNum }).map((_, index) => {
        return <Markers key={index} map={map} index={index} isSelected={true} isPending={false} />;
      })}
      <PendingMarker map={map} />
    </>
  );
};

export default DispatchPath;
