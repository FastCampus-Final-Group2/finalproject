'use server'

import { DispatchListResponse } from '@/models/ApiTypes'
import axios from '@/utils/axios'
import { DISPATCH_NUMBER_API_PATH } from '@/apis/path'
import toAxios from '@/utils/toAxios'

const vehicleControlDispatchCodeId = async (dispatchCodeId: number) => {
  return toAxios(axios.get<DispatchListResponse>(DISPATCH_NUMBER_API_PATH.dispatchNumberDispatchCodeId.replace("{dispatchCodeId}", dispatchCodeId.toString())))
}

export default vehicleControlDispatchCodeId;