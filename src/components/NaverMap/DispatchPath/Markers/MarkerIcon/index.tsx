import { colors } from "@/styles/theme";
import StartMarkerIcon from "@/components/NaverMap/DispatchPath/Markers/MarkerIcon/StartMarkerIcon";
import { PENDING_COLOR, SM_COLOR_MAP } from "@/components/NaverMap/index.constants";
import EndMarkerIcon from "@/components/NaverMap/DispatchPath/Markers/MarkerIcon/EndMarkerIcon";
import TransitMarkerIcon from "@/components/NaverMap/DispatchPath/Markers/MarkerIcon/TransitMarkerIcon";
import { TEXT_350 } from "@/styles/smColor";
import { CourseDetailResponse } from "@/models/ApiTypes";
import Icon from "@/components/core/Icon";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

dayjs.extend(customParseFormat);

interface MarkerIconProps {
  type: "start" | "end" | "path" | "pending";
  index: number;
  coordinateIndex: number;
  courseDetail?: CourseDetailResponse;
}

const MarkerIcon = ({ index, type, coordinateIndex, courseDetail }: MarkerIconProps) => {
  if (type === "start") {
    return <StartMarkerIcon color={colors[SM_COLOR_MAP[index]][350]} />;
  }

  if (type === "end") {
    return (
      <div className="group relative">
        {courseDetail && (
          <div className="absolute bottom-[53px] z-50 hidden w-max flex-col gap-1 rounded-4 border border-gray-200 bg-white px-4 py-3 group-hover:flex">
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
                <div className="flex gap-1 pl-9 text-gray-700 text-B-14-R">
                  <Icon id="place" className="text-gray-400" />
                  <div className="text-gray-700 text-SB-14-R">{courseDetail.detailAddress}</div>
                </div>
              </div>
            )}
          </div>
        )}
        <EndMarkerIcon color={colors[SM_COLOR_MAP[index]][350]} />
      </div>
    );
  }

  if (type === "path") {
    return (
      <div className="group relative">
        {courseDetail && (
          <div className="absolute bottom-[53px] z-50 hidden w-max flex-col gap-1 rounded-4 border border-gray-200 bg-white px-4 py-3 group-hover:flex">
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
                <div className="flex gap-1 pl-9 text-gray-700 text-B-14-R">
                  <Icon id="place" className="text-gray-400" />
                  <div className="text-gray-700 text-SB-14-R">{courseDetail.detailAddress}</div>
                </div>
              </div>
            )}
          </div>
        )}
        <TransitMarkerIcon color={TEXT_350[SM_COLOR_MAP[index]]} index={coordinateIndex} />
      </div>
    );
  }

  if (type === "pending") {
    return (
      <div className="group relative">
        {courseDetail && (
          <div className="absolute bottom-[53px] z-50 hidden w-max flex-col gap-1 rounded-4 border border-gray-200 bg-white px-4 py-3 group-hover:flex">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-white">
                  {String.fromCharCode(65 + coordinateIndex)}
                </div>
                <div className="text-gray-700 text-T-16-M">{courseDetail.roadAddress}</div>
              </div>
              <div>
                <Icon id="arrowRight" className="text-gray-900" />
              </div>
            </div>
            <div className="flex items-center">
              <div className="flex justify-between pl-8 pr-2 text-gray-700 text-B-14-R">
                <div className="">{`${courseDetail.volume}㎥`}</div>
                <div>・</div>
                <div className="">{`${courseDetail.weight}kg`}</div>
              </div>
              <div className="h-6 w-0 border border-gray-100" />
              <div className="flex items-center">
                <div className="p-2 text-gray-700 text-B-14-R">
                  {dayjs(courseDetail.serviceRequestDate, "YYYY-MM-DD").format("MM월DD일")}
                </div>
                {courseDetail.serviceRequestTime && (
                  <div className="p-2 text-gray-700 text-B-14-R">
                    {dayjs(String(courseDetail.serviceRequestTime), "HH:mm:ss").format("HH:mm")}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <TransitMarkerIcon
          color={PENDING_COLOR.default}
          index={String.fromCharCode(65 + coordinateIndex)}
          isPending={true}
        />
      </div>
    );
  }
};

export default MarkerIcon;
