'use server'

import { SearchDispatchesParams, DispatchNumberSearchRequest, DispatchNumberSearchResponse } from '@/models/ApiTypes'
import axios from '@/utils/axios'
import { DISPATCH_NUMBER_API_PATH } from '@/apis/path'
import toAxios from '@/utils/toAxios'

const search = async (searchDispatchesParams: SearchDispatchesParams) => {
  const { status, isManager, startDate, endDateTime, searchOption, searchKeyword } = searchDispatchesParams.request;

  const dispatchNumberSearchRequest: DispatchNumberSearchRequest = {
    status,
    isManager,
    startDate,
    endDateTime,
    searchOption,
    searchKeyword,
  };

  return toAxios(
    axios.get<DispatchNumberSearchResponse>(DISPATCH_NUMBER_API_PATH.dispatchNumberSearch, {
      params: dispatchNumberSearchRequest,
    })
  );
}

export default search;