import { GetCenterData } from "@/models/ApiTypes";

export const isCenterData = (info: GetCenterData): info is GetCenterData => {
  return !("deliveryDestinationId" in info);
};
