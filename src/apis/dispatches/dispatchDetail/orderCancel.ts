'use server'

import { DispatchCancelRequest } from '@/models/ApiTypes'
import axios from '@/utils/axios'
import { DISPATCH_DETAIL_API_PATH } from '@/apis/path'
import toAxios from '@/utils/toAxios'

const orderCancel = async (dispatchCancelRequest: DispatchCancelRequest) => {
  return toAxios(axios.patch(DISPATCH_DETAIL_API_PATH.dispatchDetail + "/vehicle-control", dispatchCancelRequest))
}

export default orderCancel;