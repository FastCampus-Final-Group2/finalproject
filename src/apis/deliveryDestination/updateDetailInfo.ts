import axios from "@/utils/axios";
import toAxios from "@/utils/toAxios";
import { UpdateDeliveryDestinationRequest } from "@/models/ApiTypes";
import { DESTINATION_API_PATH } from "@/apis/path";

const updateDetailInfo = async (
  deliveryDestinationId: number,
  updateDeliveryDestinationRequest: UpdateDeliveryDestinationRequest,
) => {
  return toAxios(
    axios.patch(`${DESTINATION_API_PATH.updateDetailInfo}/${deliveryDestinationId}`, updateDeliveryDestinationRequest),
  );
};

export default updateDetailInfo;
