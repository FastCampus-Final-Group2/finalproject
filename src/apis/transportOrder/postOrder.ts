import { DispatchResponse, TransportOrderRequest } from "@/models/ApiTypes";
import axios from "@/utils/axios";
import { TRANSPORT_ORDER_API_PATH } from "@/apis/path";
import toAxios from "@/utils/toAxios";

const postOrder = async (transportOrderRequest: TransportOrderRequest) => {
  return toAxios<DispatchResponse>(axios.post(TRANSPORT_ORDER_API_PATH.postOrder, transportOrderRequest));
};

export default postOrder;
