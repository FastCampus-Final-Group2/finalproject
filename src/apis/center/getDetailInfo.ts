import axios from "@/utils/axios";
import toAxios from "@/utils/toAxios";
import { GetCenterData } from "@/models/ApiTypes";
import { CENTER_API_PATH } from "@/apis/path";

const getDetailInfo = async (centerId: number) => {
  return toAxios<GetCenterData>(axios.get(`${CENTER_API_PATH.getDetailInfo}/${centerId}`));
};

export default getDetailInfo;
