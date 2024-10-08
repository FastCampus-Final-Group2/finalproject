import { ValidateSmNameAndSmIdsData, ValidationListRequest } from "@/models/ApiTypes";
import axios from "@/utils/axios";
import { TRANSPORT_ORDER_API_PATH } from "@/apis/path";
import toAxios from "@/utils/toAxios";

const valid = async (validationListRequest: ValidationListRequest) => {
  return toAxios<ValidateSmNameAndSmIdsData>(axios.post(TRANSPORT_ORDER_API_PATH.valid, validationListRequest));
};

export default valid;
