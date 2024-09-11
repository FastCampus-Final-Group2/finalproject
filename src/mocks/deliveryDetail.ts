import { GetCenterData, GetDeliveryDestinationData } from "@/models/ApiTypes";

export const DeliveryDetailInfo: Required<GetDeliveryDestinationData> = {
  deliveryDestinationId: 1,
  centerCode: "C001",
  centerName: "충남정보센터",
  centerRoadAddress: "충남 논산시 중앙대로 374번길 41-11",
  centerLotNumberAddress: "충남 논산시 중앙동 41",
  destinationName: "충남정보센터",
  roadAddress: "충남 논산시 중앙대로 374번길 41-11",
  lotNumberAddress: "충남 논산시 중앙동 41",
  detailAddress: "1층 물류센터",
  zipCode: "32934",
  adminName: "김물류",
  phoneNumber: "01012345678",
  latitude: 36.3214,
  longitude: 127.1724,
  restrictedWingBody: "1,2.5,5",
  restrictedBox: "1",
  restrictedCargo: "2.5,5",
  comment: "윙바디 진입 불가",
  delayTime: 70,
  updateAt: "2024-09-09T13:26:10.609Z",
};

export const CenterDetailInfo: Required<GetCenterData> = {
  centerId: 1,
  centerCode: "C001",
  centerName: "충남정보센터",
  roadAddress: "충남 논산시 중앙대로 374번길 41-11",
  lotNumberAddress: "충남 논산시 중앙동 41",
  detailAddress: "1층 물류센터",
  zipCode: "32934",
  adminName: "김물류",
  phoneNumber: "01012345678",
  latitude: 36.3214,
  longitude: 127.1724,
  restrictedWingBody: "1,2.5,5",
  restrictedBox: "1",
  restrictedCargo: "2.5,5",
  comment: "윙바디 진입 불가",
  delayTime: 70,
  updateAt: "2024-09-08T07:45:13.489Z",
};

// export const DeliveryInfo = {
//   deliveryDestinationName: "대전정보센터 (서구)", // 배송처명
//   managerName: "김물류", //
//   managerPhoneNumber: "01012345678", // 연락처
//   zipCode: "32907", // 우편번호
//   latitude: 36.2744, // 위도
//   longitude: 127.1724, // 경도
//   basicAddress: "충남 논산시 중앙대로 384번길 41-11", // 기본 주소
//   detailedAddress: "1층 물류센터", // 상세 주소
//   delayTime: 174, // 작업추가 소요시간
//   comment: "비고", // 비고
//   restrictedTonCode: "윙바디 5T, 탑차 8T", // 진입제약 차량
//   centerId: 1510, // 센터코드
//   centerName: "중부물류센터", // 센터명
//   updateAt: "2024-08-08T17:24:02", // 수정일시
//   createAt: "2024-08-08T17:24:02", // 생성일시
// } as const;
