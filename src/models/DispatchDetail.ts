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
  CancelDispatchDetailData,
  CancelDispatchDetailError,
  CancelDispatchDetailPayload,
  GetDispatchDetailData,
  GetDispatchDetailError,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class DispatchDetail<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description dispatchDetailId List를 입력받아 배송 취소
   *
   * @tags DispatchDetail
   * @name CancelDispatchDetail
   * @summary 배송 취소
   * @request PATCH:/api/dispatch-detail/vehicle-control
   * @secure
   * @response `200` `CancelDispatchDetailData` 배송 취소 성공
   * @response `400` `ErrorResponse` 올바르지 않은 배차상세 id가 있습니다.
   * @response `401` `ErrorResponse` 권한 없음
   * @response `404` `ErrorResponse` 배차상세에 맞는 운송실행주문이 없습니다.
   */
  cancelDispatchDetail = (data: CancelDispatchDetailPayload, params: RequestParams = {}) =>
    this.request<CancelDispatchDetailData, CancelDispatchDetailError>({
      path: `/api/dispatch-detail/vehicle-control`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 특정 배차 ID에 대한 상세 정보를 조회합니다.
   *
   * @tags DispatchDetail
   * @name GetDispatchDetail
   * @summary 차량 관제 배차 상세 조회
   * @request GET:/api/dispatch-detail/{dispatchId}/vehicle-control
   * @secure
   * @response `200` `GetDispatchDetailData` 배차 상세 조회 성공
   * @response `404` `ErrorResponse` 존재하지 않는 배송처입니다.
   */
  getDispatchDetail = (dispatchId: number, params: RequestParams = {}) =>
    this.request<GetDispatchDetailData, GetDispatchDetailError>({
      path: `/api/dispatch-detail/${dispatchId}/vehicle-control`,
      method: "GET",
      secure: true,
      ...params,
    });
}
