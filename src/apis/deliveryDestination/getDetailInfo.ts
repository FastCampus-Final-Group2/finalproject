import axios from "@/utils/axios";
import toAxios from "@/utils/toAxios";
import { GetDeliveryDestinationData } from "@/models/ApiTypes";
import { DESTINATION_API_PATH } from "@/apis/path";

const getDetailInfo = async (deliveryDestinationId: number) => {
  return toAxios<GetDeliveryDestinationData>(
    axios.get(`${DESTINATION_API_PATH.getDetailInfo}/${deliveryDestinationId}`),
  );
};

export default getDetailInfo;
