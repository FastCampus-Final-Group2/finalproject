'use server'

import { DispatchDetailResponse } from '@/models/ApiTypes'
import axios from '@/utils/axios'
import { DISPATCH_DETAIL_API_PATH } from '@/apis/path'
import toAxios from '@/utils/toAxios'

const vehicleControlDispatchId = async (dispatchId: number) => {
  return toAxios(axios.get<DispatchDetailResponse>(DISPATCH_DETAIL_API_PATH.dispatchDetailDispatchId.replace("{dispatchId}", dispatchId.toString())))
}

export default vehicleControlDispatchId;