"use client";

import ReactDOMServer from "react-dom/server";
import { startStopoverResponseSelector } from "@/atoms/dispatchData";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import MarkerIcon from "@/components/NaverMap/DispatchPath/Markers/MarkerIcon";

interface StartMarkerProps {
  map: naver.maps.Map;
  index: number;
}

const StartMarker = ({ map, index }: StartMarkerProps) => {
  const startStopover = useRecoilValue(startStopoverResponseSelector);

  useEffect(() => {
    if (!startStopover) return;

    const markers: naver.maps.Marker[] = [];

    const markerOptions = {
      position: new window.naver.maps.LatLng(startStopover.lat, startStopover.lon),
      map: map,
      icon: {
        content: ReactDOMServer.renderToString(<MarkerIcon index={index} type="start" coordinateIndex={0} />),
        size: new naver.maps.Size(50, 50),
        anchor: new naver.maps.Point(25, 50),
      },
      title: `Group ${index + 1} - Waypoint 0`,
    };

    const marker = new window.naver.maps.Marker(markerOptions);

    markers.push(marker);

    return () => {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
    };
  }, [index, map, startStopover]);

  return <></>;
};

export default StartMarker;
