'use server'

import { DispatchDetailResponse } from '@/models/ApiTypes'
import axios from '@/utils/axios'
import { DISPATCH_DETAIL_API_PATH } from '@/apis/path'

const dispatchIdVehicleControl = async (dispatchId: number): Promise<DispatchDetailResponse> => {

  const response = await axios.get<DispatchDetailResponse>(DISPATCH_DETAIL_API_PATH.dispatchDetail + "/" + dispatchId + "/vehicle-control")
  return response.data
}

export default dispatchIdVehicleControl;