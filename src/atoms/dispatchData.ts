import { atom, selector, selectorFamily } from "recoil";
import { persistAtom } from "./persistAtom";
import { DispatchResponse, CourseDetailResponse, CoordinatesResponse, StartStopoverResponse } from "@/models/ApiTypes";

export const dispatchDataState = atom<DispatchResponse | null>({
  key: "dispatchDataState",
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const pendingOrderDataState = atom<CourseDetailResponse[]>({
  key: "pendingOrderDataState",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const selectedDriverState = atom<number>({
  key: "selectedDriverState",
  default: 0,
  effects_UNSTABLE: [persistAtom],
});

export const selectedPendingState = atom<number>({
  key: "selectedPendingState",
  default: -1,
  effects_UNSTABLE: [persistAtom],
});

export const stopOverListSelector = selector<CourseDetailResponse[]>({
  key: "stopOverListSelector",
  get: ({ get }) => {
    const dispatchData = get(dispatchDataState);
    const selectedDriver = get(selectedDriverState);

    if (!dispatchData) return [];

    return dispatchData.course[selectedDriver].courseDetailResponseList;
  },
  set: ({ get, set }, newStopOverList) => {
    const dispatchData = get(dispatchDataState);
    const selectedDriver = get(selectedDriverState);

    if (!dispatchData) return;

    set(dispatchDataState, {
      ...dispatchData,
      course: [
        ...dispatchData.course.slice(0, selectedDriver),
        {
          ...dispatchData.course[selectedDriver],
          courseDetailResponseList: newStopOverList,
        },
        ...dispatchData.course.slice(selectedDriver + 1),
      ],
    } as DispatchResponse);
  },
});

export const driverNumSelector = selector<number>({
  key: "driverNumSelector",
  get: ({ get }) => {
    const dispatchData = get(dispatchDataState);

    if (!dispatchData) return 0;

    return dispatchData.course.length;
  },
});

export const startStopoverResponseSelector = selector<StartStopoverResponse | null>({
  key: "startStopoverResponseSelector",
  get: ({ get }) => {
    const dispatchData = get(dispatchDataState);

    if (!dispatchData) return null;

    return dispatchData.startStopoverResponse;
  },
});

export const courseDetailListSelector = selectorFamily<CourseDetailResponse[], number>({
  key: "courseDetailListSelector",
  get:
    (index) =>
    ({ get }) => {
      const dispatchData = get(dispatchDataState);

      if (!dispatchData) return [];

      return dispatchData.course[index].courseDetailResponseList;
    },
});

export const polylineCoordinatesSelector = selectorFamily<CoordinatesResponse[], number>({
  key: "polylineCoordinatesSelector",
  get:
    (index) =>
    ({ get }) => {
      const dispatchData = get(dispatchDataState);

      return dispatchData?.course[index].coordinatesResponseList || [];
    },
});
