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
