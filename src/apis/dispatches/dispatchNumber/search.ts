"use server";

import {
  SearchDispatchesParams,
  DispatchNumberSearchRequest,
  DispatchNumberSearchResponse,
} from "@/models/ApiTypes";
import axios from "@/utils/axios";
import { DISPATCH_NUMBER_API_PATH } from "@/apis/path";
import toAxios from "@/utils/toAxios";

const search = async (searchDispatchesParams: SearchDispatchesParams) => {
  const {
    status,
    isManager,
    startDateTime,
    endDateTime,
    searchOption,
    searchKeyword,
  } = searchDispatchesParams.request;

  const dispatchNumberRequest: DispatchNumberSearchRequest = {
    status,
    isManager,
    startDateTime,
    endDateTime,
    searchOption,
    searchKeyword,
  };

  const response = await toAxios(
    axios.get<DispatchNumberSearchResponse>(
      DISPATCH_NUMBER_API_PATH.dispatchNumber,
      {
        params: dispatchNumberRequest,
      }
    )
  );
  console.log("API 응답 데이터:", response);
  return { error: response[0], results: response[1] };
};

export default search;
