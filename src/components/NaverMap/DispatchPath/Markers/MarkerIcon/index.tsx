import StartMarkerIcon from "@/components/NaverMap/DispatchPath/Markers/MarkerIcon/StartMarkerIcon";
import { SM_COLOR_MAP } from "@/components/NaverMap/index.constants";
import TransitMarkerIcon from "@/components/NaverMap/DispatchPath/Markers/MarkerIcon/TransitMarkerIcon";
import { TEXT_350 } from "@/styles/smColor";
import { CourseDetailResponse, StartStopoverResponse } from "@/models/ApiTypes";
import Icon from "@/components/core/Icon";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { colors } from "@/styles/theme";

dayjs.extend(customParseFormat);

interface MarkerIconProps {
  type: "start" | "path";
  index: number;
  coordinateIndex: number;
  courseDetail?: CourseDetailResponse;
  startDetail?: StartStopoverResponse;
  isSelected?: boolean;
}

const MarkerIcon = ({
  index,
  type,
  coordinateIndex,
  courseDetail,
  startDetail,
  isSelected = false,
}: MarkerIconProps) => {
  if (type === "start") {
    return (
      <div className="group relative hover:z-50">
        {startDetail && (
          <div className="absolute bottom-[42px] hidden w-max flex-col gap-1 rounded-4 border border-gray-200 bg-white px-4 py-3 group-hover:flex">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-white">S</div>
                <div className="text-gray-700 text-T-16-M">{startDetail.centerName}</div>
              </div>
            </div>
          </div>
        )}
        <StartMarkerIcon color={colors[SM_COLOR_MAP[index]][350]} isSelected={isSelected} />
      </div>
    );
  }

  if (type === "path") {
    return (
      <div className="group relative hover:z-50">
        {courseDetail && (
          <div className="absolute bottom-[53px] hidden w-max flex-col gap-1 rounded-4 border border-gray-200 bg-white px-4 py-3 group-hover:flex">
            <div className="flex items-center">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-white">
                  {coordinateIndex}
                </div>
                <div className="text-gray-700 text-T-16-M">{courseDetail.roadAddress}</div>
              </div>
            </div>
            {courseDetail.detailAddress && (
              <div className="flex items-center">
                <div className="flex items-center gap-1 pl-9 text-gray-700 text-B-14-R">
                  <Icon id="place" className="text-gray-400" />
                  <div className="translate-y-[2px] text-gray-700 text-SB-14-R">{courseDetail.detailAddress}</div>
                </div>
              </div>
            )}
          </div>
        )}
        <TransitMarkerIcon color={TEXT_350[SM_COLOR_MAP[index]]} index={coordinateIndex} />
      </div>
    );
  }
};

export default MarkerIcon;
