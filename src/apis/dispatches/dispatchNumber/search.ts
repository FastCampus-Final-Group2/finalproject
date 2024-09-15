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

  const dispatchNumberRequest: Partial<DispatchNumberSearchRequest> = {
    status,
    isManager,
  };

  // 날짜 범위가 설정된 경우에만 파라미터에 추가
  if (startDateTime) {
    dispatchNumberRequest.startDateTime = startDateTime;
  }
  if (endDateTime) {
    dispatchNumberRequest.endDateTime = endDateTime;
  }

  // 검색 옵션과 키워드가 설정된 경우에만 파라미터에 추가
  if (searchOption && searchKeyword) {
    dispatchNumberRequest.searchOption = searchOption;
    dispatchNumberRequest.searchKeyword = searchKeyword;
  }

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
