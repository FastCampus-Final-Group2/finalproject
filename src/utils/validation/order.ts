import dayjs from "dayjs";

const RECEIVED_DATE_REG_EXP = /^\d{8}$/;
const SERVICE_REQUEST_DATE_REG_EXP = /^\d{8}$/;
const SERVICE_REQUEST_TIME_REG_EXP = /^([01]\d|2[0-3]):([0-5]\d)$/;
const CONTACT_REG_EXP = /^\d+$/;
const ZIPCODE_REG_EXP = /^\d{1,5}$/;
const VOLUME_REG_EXP = /^\d+$/;
const WEIGHT_REG_EXP = /^\d+$/;
const EXPECTED_SERVICE_DURATION_REG_EXP = /^\d+$/;
const PRODUCT_QUANTITY_REG_EXP = /^\d+$/;

const validDeliveryType = (value: string): boolean => {
  return value === "지입" || value === "택배";
};

const validSmName = (value: string): { id: number; isValid: boolean } => {
  return {
    id: 1,
    isValid: true,
  };
};

const validShipmentNumber = (value: string): boolean => {
  return value !== "";
};

const validclientOrderKey = (value: string): boolean => {
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
  return SERVICE_REQUEST_TIME_REG_EXP.test(value);
};

const validClientName = (value: string): boolean => {
  return value !== "";
};

const validContact = (value: string): boolean => {
  return CONTACT_REG_EXP.test(value);
};

const validAddress = (value: string): boolean => {
  return value !== "";
};

const validDetailAddress = (value: string): boolean => {
  return value !== "";
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
  return value !== "";
};

const validProductCode = (value: string): boolean => {
  return true;
};

const validProductQuantity = (value: string): boolean => {
  return PRODUCT_QUANTITY_REG_EXP.test(value);
};

export const OrderValidationFunc = {
  deliveryType: validDeliveryType,
  smName: validSmName,
  shipmentNumber: validShipmentNumber,
  clientOrderKey: validclientOrderKey,
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
