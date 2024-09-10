import axios from "@/utils/axios";
import toAxios from "@/utils/toAxios";
import { UpdateCenterData } from "@/models/ApiTypes";
import { CENTER_API_PATH } from "@/apis/path";

const updateDetailInfo = async (centerId: number, updateCenterRequest: UpdateCenterData) => {
  return toAxios(axios.patch(`${CENTER_API_PATH.getDetailInfo}/${centerId}`, updateCenterRequest));
};

export default updateDetailInfo;
