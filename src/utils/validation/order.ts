import { SmInfos } from "@/types/excel";
import dayjs from "dayjs";

const SHIPMENT_NUM_REG_EXP = /^357\d{10}$/;
const RECEIVED_DATE_REG_EXP = /^\d{8}$/;
const SERVICE_REQUEST_DATE_REG_EXP = /^\d{8}$/;
const SERVICE_REQUEST_TIME_REG_EXP = /^([01]\d|2[0-3]):([0-5]\d)$/;
const CONTACT_REG_EXP = /^\d{9,11}$/;
const ZIPCODE_REG_EXP = /^\d{5}$/;
const VOLUME_REG_EXP = /^(?!0(\.0+)?$)([1-9]\d*|0)(\.\d*[1-9])?$/;
const WEIGHT_REG_EXP = /^(?!0(\.0+)?$)([1-9]\d*|0)(\.\d*[1-9])?$/;
const EXPECTED_SERVICE_DURATION_REG_EXP = /^\d+$/;
const PRODUCT_QUANTITY_REG_EXP = /^\d+$/;

const validDeliveryType = (value: string): boolean => {
  return value === "지입" || value === "택배" || value === "용차";
};

const validSmName = (value: string, smInfos?: SmInfos): { id: number; isValid: boolean } => {
  if (smInfos) {
    if (smInfos[value]) {
      return {
        id: smInfos[value].smId,
        isValid: smInfos[value].smNameValid,
      };
    }
  }

  return {
    id: -1,
    isValid: false,
  };
};

const validClientName = (value: string): boolean => {
  return value !== "";
};

const validShipmentNum = (value: string): boolean => {
  return SHIPMENT_NUM_REG_EXP.test(value);
};

const validClientOrderKey = (value: string): boolean => {
  return true;
};

const validOrderType = (value: string): boolean => {
  return value === "배송" || value === "수거";
};

const validReceivedDate = (value: string): boolean => {
  if (!RECEIVED_DATE_REG_EXP.test(value)) return false;

  const inputDate = dayjs(value, "YYYYMMDD", true);

  if (!inputDate.isValid()) return false;

  const todayDate = dayjs().startOf("day");

  return !inputDate.isAfter(todayDate);
};

const validServiceRequestDate = (value: string): boolean => {
  if (!SERVICE_REQUEST_DATE_REG_EXP.test(value)) return false;

  const inputDate = dayjs(value, "YYYYMMDD", true);

  return inputDate.isValid();
};

const validServiceRequestTime = (value: string): boolean => {
  if (value === "") return true;
  return SERVICE_REQUEST_TIME_REG_EXP.test(value);
};

const validContact = (value: string): boolean => {
  return CONTACT_REG_EXP.test(value);
};

const validAddress = (value: string): boolean => {
  return value !== "";
};

const validDetailAddress = (value: string): boolean => {
  return true;
};

const validZipcode = (value: string): boolean => {
  return ZIPCODE_REG_EXP.test(value);
};

const validVolume = (value: string): boolean => {
  return VOLUME_REG_EXP.test(value);
};

const validWeight = (value: string): boolean => {
  return WEIGHT_REG_EXP.test(value);
};

const validNote = (value: string): boolean => {
  return true;
};

const validExpectedServiceDuration = (value: string): boolean => {
  if (value === "") return true;
  return EXPECTED_SERVICE_DURATION_REG_EXP.test(value);
};

const validProductName = (value: string): boolean => {
  return true;
};

const validProductCode = (value: string): boolean => {
  return true;
};

const validProductQuantity = (value: string): boolean => {
  if (value === "") return true;
  return PRODUCT_QUANTITY_REG_EXP.test(value);
};

export const OrderValidationFunc = {
  deliveryType: validDeliveryType,
  smName: validSmName,
  shipmentNumber: validShipmentNum,
  clientOrderKey: validClientOrderKey,
  orderType: validOrderType,
  receivedDate: validReceivedDate,
  serviceRequestDate: validServiceRequestDate,
  serviceRequestTime: validServiceRequestTime,
  clientName: validClientName,
  contact: validContact,
  address: validAddress,
  detailAddress: validDetailAddress,
  zipcode: validZipcode,
  volume: validVolume,
  weight: validWeight,
  note: validNote,
  expectedServiceDuration: validExpectedServiceDuration,
  productName: validProductName,
  productCode: validProductCode,
  productQuantity: validProductQuantity,
};
