"use client";

import ReactDOMServer from "react-dom/server";
import { courseDetailListSelector } from "@/atoms/dispatchData";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import MarkerIcon from "@/components/NaverMap/DispatchPath/Markers/MarkerIcon";

interface CourseMarkerProps {
  map: naver.maps.Map;
  index: number;
}

const CourseMarker = ({ map, index }: CourseMarkerProps) => {
  const courseDetailList = useRecoilValue(courseDetailListSelector(index));

  useEffect(() => {
    if (!courseDetailList) return;

    const markers: naver.maps.Marker[] = [];

    courseDetailList.forEach((courseDetail, coordinateIndex) => {
      const markerOptions = {
        position: new window.naver.maps.LatLng(courseDetail.lat, courseDetail.lon),
        map: map,
        icon: {
          content: ReactDOMServer.renderToString(
            <MarkerIcon index={index} type="path" coordinateIndex={coordinateIndex + 1} courseDetail={courseDetail} />,
          ),
          size: new naver.maps.Size(50, 50),
          anchor: new naver.maps.Point(25, 50),
        },
      };

      const marker = new window.naver.maps.Marker(markerOptions);

      markers.push(marker);
    });

    return () => {
      markers.forEach((marker) => {
        marker.setMap(null);
      });
    };
  }, [index, map, courseDetailList]);

  return <></>;
};

export default CourseMarker;
