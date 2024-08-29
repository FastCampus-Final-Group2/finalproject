export interface Order {
  deliveryType: "지입" | "용차" | "택배";
  smName: string;
  shipmentNum: string;
  clientOrderKey?: string;
  orderType: "배송" | "수거";
  receivedDate: Date;
  serviceRequestDate: Date;
  serviceRequestTime: Date;
  clientName: string;
  contact: string;
  address: string;
  detailAddress: string;
  zipcode: string;
  volume: number;
  weight: number;
  note?: string;
  expectedServiceDuration?: number;
  productName: string;
  productCode?: string;
  productQuantity: number;
}

export interface ExcelData {
  [key: string]: string | number | undefined;
  deliveryType?: string;
  smName?: string;
  shipmentNum?: string;
  clientOrderKey?: string;
  orderType?: string;
  receivedDate?: string;
  serviceRequestDate?: string;
  serviceRequestTime?: string;
  clientName?: string;
  contact?: string;
  address?: string;
  detailAddress?: string;
  zipcode?: string;
  volume?: number;
  weight?: number;
  note?: string;
  expectedServiceDuration?: number;
  productName?: string;
  productCode?: string;
  productQuantity?: number;
}

export interface OrderDetail {
  receivedDate: string; // 주문 접수일
  transportOrderNumber: string; // 운송장 번호
  deliveryType: string; // 배송유형
  requestedWorkDate: string; // 작업희망일
  requestedArrivalTime: string; // 희망도착시간
  estimatedWorkTime: string; // 예상작업 소요시간
  smName: string; // 담당드라이버
  productName: string; // 상품명
  productCount: number; // 수량
  volume: number; // 볼륨
  weight: number; // 중량
  managerName: string; // 담당자명
  phoneNumber: string; // 담당자연락처
  deliveryDestinationCode: number; // 배송처 코드
}
