/* eslint-disable */
/* tslint:disable */
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

import {
  DispatchNumberSearchRequest,
  GetDispatchListData,
  GetDispatchListError,
  SearchDispatchesData,
} from "./data-contracts";
import { HttpClient, RequestParams } from "./http-client";

export class DispatchNumber<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 차량관제 탭에서 배차 검색을 합니다.
   *
   * @tags DispatchNumber
   * @name SearchDispatches
   * @summary 차량관제 탭, 배차 검색
   * @request GET:/api/dispatchNumber
   * @secure
   * @response `200` `SearchDispatchesData` OK
   */
  searchDispatches = (
    query: {
      /** 배차 검색 요청 정보 */
      request: DispatchNumberSearchRequest;
    },
    params: RequestParams = {},
  ) =>
    this.request<SearchDispatchesData, any>({
      path: `/api/dispatchNumber`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 차량관제 탭에서 선택한 배차코드에 대한 정보를 조회합니다. (DispatchListResponse)
   *
   * @tags DispatchNumber
   * @name GetDispatchList
   * @summary 차량관제 탭, 배차코드 상세 조회
   * @request GET:/api/dispatchNumber/{dispatchCodeId}/vehicle-control
   * @secure
   * @response `200` `GetDispatchListData` 배차코드 상세 조회 성공
   * @response `400` `ErrorResponse` bad request
   * @response `401` `ErrorResponse` 권한 없음
   * @response `404` `ErrorResponse` 배송처를 찾지 못했습니다
   * @response `500` `ErrorResponse` 서버 에러
   */
  getDispatchList = (dispatchCodeId: number, params: RequestParams = {}) =>
    this.request<GetDispatchListData, GetDispatchListError>({
      path: `/api/dispatchNumber/${dispatchCodeId}/vehicle-control`,
      method: "GET",
      secure: true,
      ...params,
    });
}
