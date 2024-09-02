export const DELIVERY_INFO_LABEL = {
  destination: {
    deliveryDestinationCode: "배송처 코드",
    deliveryDestinationName: "배송처명",
    managerName: "담당자명",
    managerPhoneNumber: "연락처",
    zipCode: "우편번호",
    "latitude/longitude": "위도/경도",
    basicAddress: "상세주소",
    detailedAddress: "",
  },
  center: {
    deliveryDestinationCode: "센터 코드",
    deliveryDestinationName: "센터명",
    managerName: "담당자명",
    managerPhoneNumber: "연락처",
    zipCode: "우편번호",
    "latitude/longitude": "위도/경도",
    basicAddress: "상세주소",
    detailedAddress: "",
  },
} as const;

export const DELIVERY_INFO_KEYS = [
  { key: "deliveryDestinationCode", line: 1 },
  { key: "deliveryDestinationName", line: 1 },
  { key: "managerName", line: 1 },
  { key: "managerPhoneNumber", line: 1 },
  { key: "zipCode", line: 1 },
  { key: "latitude/longitude", line: 1 },
  { key: "basicAddress", line: 2 },
  { key: "detailedAddress", line: 1 },
] as const;

export const AFFILIATION_CENTER_INFO_LABEL = {
  centerId: "센터코드",
  centerName: "센터명",
  basicAddress: "주소",
} as const;
