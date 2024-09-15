"use client";

import StartMarker from "./StartMarker";
import CourseMarker from "./CourseMarker";

interface MarkerProps {
  map: naver.maps.Map;
  index: number;
  isSelected: boolean;
  isPending: boolean;
}

const Markers = ({ map, index }: MarkerProps) => {
  return (
    <>
      <StartMarker map={map} index={index} />
      <CourseMarker map={map} index={index} />
    </>
  );
};

export default Markers;
