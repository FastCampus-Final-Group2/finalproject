import { atom } from "recoil";

export interface CourseDetail {
  restrictedTonCode: boolean;
  delayRequestTime: boolean;
  overContractNum: boolean;
  ett: number;
  expectationOperationStartTime: string;
  expectationOperationEndTime: string;
  deliveryDestinationId: number;
  managerName: string | null;
  phoneNumber: string | null;
  lat: number;
  lon: number;
  distance: number;
  deliveryType: string;
  smId: number;
  smName: string;
  shipmentNumber: string;
  clientOrderKey: string;
  orderType: string;
  receivedDate: string;
  serviceRequestDate: string;
  serviceRequestTime: string;
  clientName: string;
  contact: string;
  roadAddress: string;
  lotNumberAddress: string;
  detailAddress: string;
  zipcode: string;
  volume: number;
  weight: number;
  note: string;
  expectedServiceDuration: number;
  productName: string;
  productCode: string;
  productQuantity: number;
}

export interface Coordinate {
  lat: number;
  lon: number;
}

export interface Course {
  errorYn: boolean;
  smName: string;
  smPhoneNumber: string;
  vehicleType: string;
  vehicleTon: number;
  orderNum: number;
  mileage: number;
  totalTime: number;
  floorAreaRatio: number;
  breakStartTime: string;
  breakEndTime: string;
  restingPosition: number;
  courseDetailResponseList: CourseDetail[];
  coordinatesResponseList: Coordinate[];
}

export interface StartStopoverResponse {
  centerId: number;
  centerName: string;
  lat: number;
  lon: number;
  expectedServiceDuration: string;
  departureTime: string;
}

export interface DispatchData {
  dispatchCode: string;
  dispatchName: string;
  totalOrder: number;
  totalErrorNum: number;
  totalTime: number;
  totalFloorAreaRatio: number;
  loadingStartTime: string;
  contractType: string;
  startStopoverResponse: StartStopoverResponse;
  course: Course[];
}

const defaultDispatchData: DispatchData = {
  dispatchCode: "20240917C002#1",
  dispatchName: "배차1",
  totalOrder: 4,
  totalErrorNum: 4,
  totalTime: 464,
  totalFloorAreaRatio: 2,
  loadingStartTime: "2024-09-10T07:48:51.248",
  contractType: "택배",
  startStopoverResponse: {
    centerId: 1,
    centerName: "충남정보센터",
    lat: 36.3214,
    lon: 127.1724,
    expectedServiceDuration: "01:10:00",
    departureTime: "2024-09-10T08:58:51.248",
  },
  course: [
    {
      errorYn: true,
      smName: "신원준",
      smPhoneNumber: "010-1111-1111",
      vehicleType: "WING_BODY",
      vehicleTon: 5,
      orderNum: 1,
      mileage: 149,
      totalTime: 116,
      floorAreaRatio: 2,
      breakStartTime: "12:00:00",
      breakEndTime: "13:00:00",
      restingPosition: 0,
      courseDetailResponseList: [
        {
          restrictedTonCode: false,
          delayRequestTime: false,
          overContractNum: true,
          ett: 86,
          expectationOperationStartTime: "2024-09-10T09:55:19.248",
          expectationOperationEndTime: "2024-09-10T10:25:19.248",
          deliveryDestinationId: 0,
          managerName: null,
          phoneNumber: null,
          lat: 37.5106878726742,
          lon: 127.042788015211,
          distance: 50.8273,
          deliveryType: "택배",
          smId: 1,
          smName: "신원준",
          shipmentNumber: "1284065890",
          clientOrderKey: "A123456789",
          orderType: "배송",
          receivedDate: "2024-09-09",
          serviceRequestDate: "2024-09-11",
          serviceRequestTime: "14:00:00",
          clientName: "김철수",
          contact: "010-1234-5678",
          roadAddress: "서울특별시 강남구 논현동 578-3",
          lotNumberAddress: "서울 강남구 논현동 578-3",
          detailAddress: "",
          zipcode: "06103",
          volume: 2.5,
          weight: 10,
          note: "문 앞에 놔주세요",
          expectedServiceDuration: 30,
          productName: "전자제품",
          productCode: "P123456",
          productQuantity: 5,
        },
        {
          restrictedTonCode: true,
          delayRequestTime: true,
          overContractNum: false,
          ett: 48,
          expectationOperationStartTime: "2024-09-10T10:25:19.248",
          expectationOperationEndTime: "2024-09-10T11:25:19.248",
          deliveryDestinationId: 0,
          managerName: null,
          phoneNumber: null,
          lat: 37.5110878726742,
          lon: 127.043088015211,
          distance: 70.82730264771766,
          deliveryType: "택배",
          smId: 1,
          smName: "신원준",
          shipmentNumber: "2234067990",
          clientOrderKey: "A123456789",
          orderType: "배송",
          receivedDate: "2024-09-09",
          serviceRequestDate: "2024-09-11",
          serviceRequestTime: "14:00:00",
          clientName: "김철수",
          contact: "010-1234-5678",
          roadAddress: "서울특별시 강남구 논현동 778-3",
          lotNumberAddress: "서울 강남구 논현동 778-3",
          detailAddress: "",
          zipcode: "06103",
          volume: 2.5,
          weight: 10,
          note: "문 앞에 놔주세요",
          expectedServiceDuration: 30,
          productName: "전자제품",
          productCode: "P123456",
          productQuantity: 5,
        },
        {
          restrictedTonCode: false,
          delayRequestTime: false,
          overContractNum: false,
          ett: 36,
          expectationOperationStartTime: "2024-09-10T11:25:19.248",
          expectationOperationEndTime: "2024-09-10T11:37:19.248",
          deliveryDestinationId: 0,
          managerName: null,
          phoneNumber: null,
          lat: 37.5106878726742,
          lon: 127.042788015211,
          distance: 35.82,
          deliveryType: "택배",
          smId: 1,
          smName: "신원준",
          shipmentNumber: "1834567310",
          clientOrderKey: "A123456789",
          orderType: "배송",
          receivedDate: "2024-09-09",
          serviceRequestDate: "2024-09-11",
          serviceRequestTime: "14:00:00",
          clientName: "김철수",
          contact: "010-1234-5678",
          roadAddress: "서울특별시 강남구 논현동 678-3",
          lotNumberAddress: "서울 강남구 논현동 678-3",
          detailAddress: "",
          zipcode: "06103",
          volume: 2.5,
          weight: 10,
          note: "문 앞에 놔주세요",
          expectedServiceDuration: 30,
          productName: "전자제품",
          productCode: "P123456",
          productQuantity: 5,
        },
      ],
      coordinatesResponseList: [
        {
          lon: 127.17614453695751,
          lat: 36.32040839929852,
        },
        {
          lon: 127.1766276,
          lat: 36.3215926,
        },
        {
          lon: 127.1769758,
          lat: 36.3227361,
        },
        {
          lon: 127.1770629,
          lat: 36.3230639,
        },
        {
          lon: 127.1771367,
          lat: 36.3234191,
        },
        {
          lon: 127.1771783,
          lat: 36.3236677,
        },
        {
          lon: 127.1771764,
          lat: 36.3238217,
        },
        {
          lon: 127.1771367,
          lat: 36.324244,
        },
        {
          lon: 127.1768926,
          lat: 36.3256193,
        },
        {
          lon: 127.1768907,
          lat: 36.3257885,
        },
        {
          lon: 127.1769039,
          lat: 36.3259959,
        },
        {
          lon: 127.1769266,
          lat: 36.326124,
        },
        {
          lon: 127.1769899,
          lat: 36.3263705,
        },
        {
          lon: 127.1771253,
          lat: 36.3267277,
        },
        {
          lon: 127.177396,
          lat: 36.32733,
        },
        {
          lon: 127.1777494,
          lat: 36.3282119,
        },
        {
          lon: 127.1778236,
          lat: 36.3284597,
        },
        {
          lon: 127.1778303,
          lat: 36.3285547,
        },
        {
          lon: 127.1778227,
          lat: 36.3287726,
        },
        {
          lon: 127.1777593,
          lat: 36.3292315,
        },
        {
          lon: 127.1775962,
          lat: 36.3296962,
        },
        {
          lon: 127.1775158,
          lat: 36.3299965,
        },
        {
          lon: 127.1774782,
          lat: 36.3302934,
        },
        {
          lon: 127.1773133,
          lat: 36.3319141,
        },
      ],
    },
    {
      errorYn: true,
      smName: "김재민",
      smPhoneNumber: "010-0000-0000",
      vehicleType: "BOX",
      vehicleTon: 5,
      orderNum: 1,
      mileage: 149,
      totalTime: 116,
      floorAreaRatio: 0,
      breakStartTime: "12:00:00",
      breakEndTime: "13:00:00",
      restingPosition: 0,
      courseDetailResponseList: [
        {
          restrictedTonCode: false,
          delayRequestTime: false,
          overContractNum: true,
          ett: 116,
          expectationOperationStartTime: "2024-09-10T10:55:23.248",
          expectationOperationEndTime: "2024-09-10T11:15:23.248",
          deliveryDestinationId: 0,
          managerName: null,
          phoneNumber: null,
          lat: 37.5113794948545,
          lon: 127.043741334638,
          distance: 149.95576597470446,
          deliveryType: "지입",
          smId: 2,
          smName: "김재민",
          shipmentNumber: "0987654321",
          clientOrderKey: "B987654321",
          orderType: "수거",
          receivedDate: "2024-09-09",
          serviceRequestDate: "2024-09-11",
          serviceRequestTime: "10:00:00",
          clientName: "박영수",
          contact: "010-9876-5432",
          roadAddress: "서울특별시 강남구 선릉로 610",
          lotNumberAddress: "서울 강남구 삼성동 35-9",
          detailAddress: "2층, 202호",
          zipcode: "06097",
          volume: 3,
          weight: 15,
          note: "빠른 수거 부탁드립니다",
          expectedServiceDuration: 20,
          productName: "가전제품",
          productCode: "G987654",
          productQuantity: 2,
        },
      ],
      coordinatesResponseList: [
        {
          lon: 127.17614453695751,
          lat: 36.32040839929852,
        },
        {
          lon: 127.1766276,
          lat: 36.3215926,
        },
        {
          lon: 127.1769758,
          lat: 36.3227361,
        },
        {
          lon: 127.1770629,
          lat: 36.3230639,
        },
        {
          lon: 127.1771367,
          lat: 36.3234191,
        },
        {
          lon: 127.1771783,
          lat: 36.3236677,
        },
        {
          lon: 127.1771764,
          lat: 36.3238217,
        },
        {
          lon: 127.1771367,
          lat: 36.324244,
        },
        {
          lon: 127.1768926,
          lat: 36.3256193,
        },
        {
          lon: 127.1768907,
          lat: 36.3257885,
        },
        {
          lon: 127.1769039,
          lat: 36.3259959,
        },
        {
          lon: 127.1769266,
          lat: 36.326124,
        },
        {
          lon: 127.1769899,
          lat: 36.3263705,
        },
        {
          lon: 127.1771253,
          lat: 36.3267277,
        },
        {
          lon: 127.177396,
          lat: 36.32733,
        },
        {
          lon: 127.1777494,
          lat: 36.3282119,
        },
        {
          lon: 127.1778236,
          lat: 36.3284597,
        },
        {
          lon: 127.1778303,
          lat: 36.3285547,
        },
        {
          lon: 127.1778227,
          lat: 36.3287726,
        },
        {
          lon: 127.1777593,
          lat: 36.3292315,
        },
        {
          lon: 127.1775962,
          lat: 36.3296962,
        },
        {
          lon: 127.1775158,
          lat: 36.3299965,
        },
        {
          lon: 127.1774782,
          lat: 36.3302934,
        },
        {
          lon: 127.1773133,
          lat: 36.3319141,
        },
      ],
    },
    {
      errorYn: true,
      smName: "최병준",
      smPhoneNumber: "010-0000-0000",
      vehicleType: "CARGO",
      vehicleTon: 5,
      orderNum: 1,
      mileage: 150,
      totalTime: 116,
      floorAreaRatio: 0,
      breakStartTime: "12:00:00",
      breakEndTime: "13:00:00",
      restingPosition: 0,
      courseDetailResponseList: [
        {
          restrictedTonCode: false,
          delayRequestTime: false,
          overContractNum: true,
          ett: 116,
          expectationOperationStartTime: "2024-09-10T10:55:33.248",
          expectationOperationEndTime: "2024-09-10T11:15:33.248",
          deliveryDestinationId: 0,
          managerName: null,
          phoneNumber: null,
          lat: 37.5108406546418,
          lon: 127.04689746838,
          distance: 150.10741982918333,
          deliveryType: "지입",
          smId: 3,
          smName: "최병준",
          shipmentNumber: "0987654321",
          clientOrderKey: "B987654321",
          orderType: "수거",
          receivedDate: "2024-09-09",
          serviceRequestDate: "2024-09-11",
          serviceRequestTime: "10:00:00",
          clientName: "박영수",
          contact: "010-9876-5432",
          roadAddress: "서울특별시 강남구 봉은사로 428",
          lotNumberAddress: "서울 강남구 삼성동 113-5",
          detailAddress: "",
          zipcode: "06153",
          volume: 3,
          weight: 15,
          note: "빠른 수거 부탁드립니다",
          expectedServiceDuration: 20,
          productName: "가전제품",
          productCode: "G987654",
          productQuantity: 2,
        },
      ],
      coordinatesResponseList: [
        {
          lon: 127.17614453695751,
          lat: 36.32040839929852,
        },
        {
          lon: 127.1766276,
          lat: 36.3215926,
        },
        {
          lon: 127.1769758,
          lat: 36.3227361,
        },
        {
          lon: 127.1770629,
          lat: 36.3230639,
        },
        {
          lon: 127.1771367,
          lat: 36.3234191,
        },
        {
          lon: 127.1771783,
          lat: 36.3236677,
        },
        {
          lon: 127.1771764,
          lat: 36.3238217,
        },
        {
          lon: 127.1771367,
          lat: 36.324244,
        },
        {
          lon: 127.1768926,
          lat: 36.3256193,
        },
        {
          lon: 127.1768907,
          lat: 36.3257885,
        },
        {
          lon: 127.1769039,
          lat: 36.3259959,
        },
        {
          lon: 127.1769266,
          lat: 36.326124,
        },
        {
          lon: 127.1769899,
          lat: 36.3263705,
        },
        {
          lon: 127.1771253,
          lat: 36.3267277,
        },
        {
          lon: 127.177396,
          lat: 36.32733,
        },
        {
          lon: 127.1777494,
          lat: 36.3282119,
        },
        {
          lon: 127.1778236,
          lat: 36.3284597,
        },
        {
          lon: 127.1778303,
          lat: 36.3285547,
        },
        {
          lon: 127.1778227,
          lat: 36.3287726,
        },
        {
          lon: 127.1777593,
          lat: 36.3292315,
        },
        {
          lon: 127.1775962,
          lat: 36.3296962,
        },
        {
          lon: 127.1775158,
          lat: 36.3299965,
        },
        {
          lon: 127.1774782,
          lat: 36.3302934,
        },
        {
          lon: 127.1773133,
          lat: 36.3319141,
        },
      ],
    },
    {
      errorYn: true,
      smName: "김명진",
      smPhoneNumber: "010-0000-0000",
      vehicleType: "CARGO",
      vehicleTon: 5,
      orderNum: 1,
      mileage: 149,
      totalTime: 116,
      floorAreaRatio: 0,
      breakStartTime: "12:00:00",
      breakEndTime: "13:00:00",
      restingPosition: 0,
      courseDetailResponseList: [
        {
          restrictedTonCode: false,
          delayRequestTime: false,
          overContractNum: false,
          ett: 116,
          expectationOperationStartTime: "2024-09-10T10:55:24.248",
          expectationOperationEndTime: "2024-09-10T11:15:24.248",
          deliveryDestinationId: 0,
          managerName: null,
          phoneNumber: null,
          lat: 37.5109583738173,
          lon: 127.043961419657,
          distance: 149.95152139199976,
          deliveryType: "지입",
          smId: 4,
          smName: "김명진",
          shipmentNumber: "0987654321",
          clientOrderKey: "B987654321",
          orderType: "수거",
          receivedDate: "2024-09-09",
          serviceRequestDate: "2024-09-11",
          serviceRequestTime: "10:00:00",
          clientName: "박영수",
          contact: "010-9876-5432",
          roadAddress: "서울 강남구 선릉로 604",
          lotNumberAddress: "서울 강남구 삼성동 37",
          detailAddress: "호산프라자 1층",
          zipcode: "06097",
          volume: 3,
          weight: 15,
          note: "빠른 수거 부탁드립니다",
          expectedServiceDuration: 20,
          productName: "가전제품",
          productCode: "G987654",
          productQuantity: 2,
        },
      ],
      coordinatesResponseList: [
        {
          lon: 127.17614453695751,
          lat: 36.32040839929852,
        },
        {
          lon: 127.1766276,
          lat: 36.3215926,
        },
        {
          lon: 127.1769758,
          lat: 36.3227361,
        },
        {
          lon: 127.1770629,
          lat: 36.3230639,
        },
        {
          lon: 127.1771367,
          lat: 36.3234191,
        },
        {
          lon: 127.1771783,
          lat: 36.3236677,
        },
        {
          lon: 127.1771764,
          lat: 36.3238217,
        },
        {
          lon: 127.1771367,
          lat: 36.324244,
        },
        {
          lon: 127.1768926,
          lat: 36.3256193,
        },
        {
          lon: 127.1768907,
          lat: 36.3257885,
        },
      ],
    },
  ],
};

export const transportOrderState = atom<DispatchData>({
  key: "transportOrderState",
  default: defaultDispatchData,
});

export const pendingOrderDataState = atom<DispatchData[]>({
  key: "pendingOrderDataState",
  default: [], // 빈 배열로 시작
});
