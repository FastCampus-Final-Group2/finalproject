"use client";

import ReactDOMServer from "react-dom/server";
import { courseDetailListSelector } from "@/atoms/dispatchData";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import MarkerIcon from "../MarkerIcon";

interface CourseMarkerProps {
  map: naver.maps.Map;
  index: number;
}

const CourseMarker = ({ map, index }: CourseMarkerProps) => {
  const courseDetailList = useRecoilValue(courseDetailListSelector(index));

  useEffect(() => {
    if (!courseDetailList) return;

    courseDetailList.forEach((courseDetail, coordinateIndex) => {
      const type = (() => {
        if (coordinateIndex === courseDetailList.length - 1) return "end";
        return "path";
      })();

      const markerOptions = {
        position: new window.naver.maps.LatLng(courseDetail.lat, courseDetail.lon),
        map: map,
        icon: {
          content: ReactDOMServer.renderToString(
            <MarkerIcon index={index} type={type} coordinateIndex={coordinateIndex + 1} courseDetail={courseDetail} />,
          ),
          size: new naver.maps.Size(50, 50),
          anchor: new naver.maps.Point(25, 50),
        },
        title: `Group ${index + 1} - Waypoint ${coordinateIndex + 1}`,
      };

      const marker = new window.naver.maps.Marker(markerOptions);
    });
  }, [index, map, courseDetailList]);

  return <></>;
};

export default CourseMarker;
