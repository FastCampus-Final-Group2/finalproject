import { atom } from "recoil";
import { LocalTime } from "@/models/ApiTypes";

// requestBodyChangeDispatchData 타입 정의
export interface RequestBodyChangeDispatchData {
  smId: number | null; // null 허용
  smIdList: (number | null)[];
  totalVolume: number | null;
  totalWeight: number | null;
  loadingStartTime: LocalTime | null; // LocalTime 타입 사용
  orderList: {
    roadAddress: string | null;
    detailAddress: string | null;
    volume: number | null;
    weight: number | null;
    lat: number | null;
    lon: number | null;
    expectedServiceDuration: number | null;
    serviceRequestDate: string | null;
    serviceRequestTime: LocalTime | null;
  }[];
}

// requestBodyChangeDispatchData atom 생성
export const requestBodyChangeDispatchDataState = atom<RequestBodyChangeDispatchData>({
  key: "requestBodyChangeDispatchDataState",
  default: {
    smId: 0,
    smIdList: [], // 기본값으로 빈 배열 설정
    totalVolume: 0, // 기본값으로 0 설정
    totalWeight: 0, // 기본값으로 0 설정
    loadingStartTime: { hour: 0, minute: 0 }, // LocalTime에 맞는 기본값 설정
    orderList: [],
  },
});
