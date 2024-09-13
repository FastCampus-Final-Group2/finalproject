'use server'

import { DispatchCancelRequest } from '@/models/ApiTypes'
import axios from '@/utils/axios'
import { DISPATCH_API_PATH } from '@/apis/path'
import toAxios from '@/utils/toAxios'

const dispatchCancel = async (dispatchCancelRequest: DispatchCancelRequest) => {
  return toAxios(axios.patch(DISPATCH_API_PATH.dispatch, dispatchCancelRequest))
}

export default dispatchCancel;

