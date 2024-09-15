"use client";

import { polylineCoordinatesSelector } from "@/atoms/dispatchData";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import { SM_COLOR_MAP } from "@/components/NaverMap/index.constants";
import { colors } from "@/styles/theme";

interface PolylineProps {
  map: naver.maps.Map;
  index: number;
}

const Polyline = ({ map, index }: PolylineProps) => {
  const coordinates = useRecoilValue(polylineCoordinatesSelector(index));

  useEffect(() => {
    const path = coordinates.map(({ lon, lat }) => {
      return new window.naver.maps.LatLng(lat, lon);
    });

    const polyline = new window.naver.maps.Polyline({
      path: path,
      map: map,
      strokeColor: colors[SM_COLOR_MAP[index]][350],
      strokeWeight: 4,
      strokeStyle: "solid",
    });
  });

  return <></>;
};

export default Polyline;
