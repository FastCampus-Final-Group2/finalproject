'use server'

import axios from '@/utils/axios';
import { DISPATCH_NUMBER_API_PATH } from '@/apis/path';
import { DispatchListResponse } from '@/models/ApiTypes';
import toAxios from '@/utils/toAxios'

const dispatchCodeIdVehicleControl = async (dispatchCodeId: number): Promise<DispatchListResponse> => {

  const response = await axios.get<DispatchListResponse>(DISPATCH_NUMBER_API_PATH.dispatchNumber + "/" + dispatchCodeId + "/vehicle-control", {
    params: {
      dispatchCodeId: dispatchCodeId,
    },
  });
  return response.data;
}

export default dispatchCodeIdVehicleControl;