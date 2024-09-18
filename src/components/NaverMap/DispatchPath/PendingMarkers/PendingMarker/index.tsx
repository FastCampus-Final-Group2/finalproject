"use client";

import Icon from "@/components/core/Icon";
import { CourseDetailResponse } from "@/models/ApiTypes";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import PendingIcon from "./PendingIcon";

dayjs.extend(customParseFormat);

interface PendingMarkerProps {
  isSelected: boolean;
  pendingIndex: number;
  pendingOrder: CourseDetailResponse;
}

const PendingMarker = ({ pendingIndex, pendingOrder, isSelected }: PendingMarkerProps) => {
  return (
    <div className="group relative flex flex-col justify-end hover:z-50">
      <div
        className={`absolute bottom-[53px] w-max flex-col gap-1 rounded-4 border border-gray-200 bg-white px-4 py-3 ${isSelected ? "flex" : "hidden group-hover:flex"}`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-700 text-white">
              {String.fromCharCode(65 + pendingIndex)}
            </div>
            <div className="text-gray-700 text-T-16-M">{pendingOrder.roadAddress}</div>
          </div>
          <button type="button" id={`modalbtn-${pendingIndex}`}>
            <Icon id="arrowRight" className="text-gray-900" />
          </button>
        </div>
        <div className="flex items-center">
          <div className="flex justify-between pl-8 pr-2 text-gray-700 text-B-14-R">
            <div className="">{`${pendingOrder.volume}㎥`}</div>
            <div>・</div>
            <div className="">{`${pendingOrder.weight}kg`}</div>
          </div>
          <div className="h-6 w-0 border border-gray-100" />
          <div className="flex items-center">
            <div className="p-2 text-gray-700 text-B-14-R">
              {dayjs(pendingOrder.serviceRequestDate, "YYYY-MM-DD").format("MM월DD일")}
            </div>
            {pendingOrder.serviceRequestTime && (
              <div className="p-2 text-gray-700 text-B-14-R">
                {dayjs(String(pendingOrder.serviceRequestTime), "HH:mm:ss").format("HH:mm")}
              </div>
            )}
          </div>
        </div>
      </div>
      <button type="button" id={`pendingIcon-${pendingIndex}`}>
        <PendingIcon index={String.fromCharCode(65 + pendingIndex)} isSelected={isSelected} />
      </button>
    </div>
  );
};

export default PendingMarker;
