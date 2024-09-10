import { GetTransportOrderByIdData } from "@/models/ApiTypes";
import axios from "@/utils/axios";
import { TRANSPORT_ORDER_API_PATH } from "@/apis/path";
import toAxios from "@/utils/toAxios";

const getDetailInfo = async (id: number) => {
  return toAxios<GetTransportOrderByIdData>(axios.get(`${TRANSPORT_ORDER_API_PATH.detail}/${id}`));
};

export default getDetailInfo;
