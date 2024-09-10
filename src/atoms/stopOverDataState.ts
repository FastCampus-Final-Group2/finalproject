import { atom } from "recoil";

interface ListStopOverData {
  id: number;
  warningCheck: boolean;
  errorMessage: string;
  address: string;
  meter: number;
  kilogram: number;
}

export const stopOverDataState = atom<ListStopOverData[]>({
  key: "stopOverDataState",
  default: [
    {
      id: 1,
      warningCheck: true,
      errorMessage: "진입 제한 조건",
      address: "서울특별시 동대문구 장안동",
      meter: 0.016,
      kilogram: 0.111,
    },
    {
      id: 2,
      warningCheck: false,
      errorMessage: "",
      address: "서울특별시 강남구 논현동",
      meter: 0.05,
      kilogram: 0.222,
    },
    {
      id: 3,
      warningCheck: true,
      errorMessage: "작업희망일 미준수",
      address: "서울특별시 중랑구 신내동",
      meter: 0.13,
      kilogram: 0.332,
    },
    {
      id: 4,
      warningCheck: false,
      errorMessage: "",
      address: "서울특별시 서초구 양재동",
      meter: 0.08,
      kilogram: 0.442,
    },
    {
      id: 5,
      warningCheck: true,
      errorMessage: "희망도착시간 미준수",
      address: "서울특별시 용산구 한남동",
      meter: 0.23,
      kilogram: 0.552,
    },
    {
      id: 6,
      warningCheck: false,
      errorMessage: "",
      address: "서울특별시 마포구 망원동",
      meter: 1.07,
      kilogram: 0.852,
    },
    {
      id: 7,
      warningCheck: true,
      errorMessage: "진입제약 차량",
      address: "서울특별시 노원구 중계동",
      meter: 0.83,
      kilogram: 0.761,
    },
  ],
});

export const pendingOrderDataState = atom<ListStopOverData[]>({
  key: "pendingOrderDataState",
  default: [], // 빈 배열로 시작
});
