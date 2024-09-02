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
  DownloadOrderFormExcelData,
  GetTransportOrderByIdData,
  GetTransportOrderByIdError,
  TransportOrderRequest,
  TransportOrderToDispatchData,
  TransportOrderToDispatchError,
  ValidateSmNameAndSmIdsData,
  ValidateSmNameAndSmIdsError,
  ValidationListRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class TransportOrder<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 입력된 주문 정보를 경로 최적화 후 최초 배차를 합니다.
   *
   * @tags Transport Order
   * @name TransportOrderToDispatch
   * @summary 주문 확인 및 배차
   * @request POST:/api/transport-order
   * @secure
   * @response `200` `TransportOrderToDispatchData` 최초 배차 성공
   * @response `401` `ErrorResponse` 권한 없음
   */
  transportOrderToDispatch = (data: TransportOrderRequest, params: RequestParams = {}) =>
    this.request<TransportOrderToDispatchData, TransportOrderToDispatchError>({
      path: `/api/transport-order`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 등록된 운송 주문의 SM명과 SM 아이디의 존재를 확인합니다.
   *
   * @tags Transport Order
   * @name ValidateSmNameAndSmIds
   * @summary 운송 주문 데이터 검증
   * @request POST:/api/transport-order/valid
   * @secure
   * @response `200` `ValidateSmNameAndSmIdsData` 운송 주문 데이터 검증 성공
   * @response `401` `ErrorResponse` 권한 없음
   */
  validateSmNameAndSmIds = (data: ValidationListRequest, params: RequestParams = {}) =>
    this.request<ValidateSmNameAndSmIdsData, ValidateSmNameAndSmIdsError>({
      path: `/api/transport-order/valid`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 배차 상세에서 주문 상세를 조회 (TransportOrderResponse)
   *
   * @tags Transport Order
   * @name GetTransportOrderById
   * @summary 주문 상세 조회
   * @request GET:/api/transport-order/{transportOrderId}
   * @secure
   * @response `200` `GetTransportOrderByIdData` 주문 상세 조회 성공
   * @response `401` `ErrorResponse` 권한 없음
   * @response `404` `ErrorResponse` 운송실행주문을 찾지 못하였습니다
   */
  getTransportOrderById = (
    transportOrderId: number,
    query?: {
      /** @format int64 */
      destinationId?: number;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetTransportOrderByIdData, GetTransportOrderByIdError>({
      path: `/api/transport-order/${transportOrderId}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
  /**
   * @description 수동 배차에서 사용되는 운송 주문 엑셀 양식을 다운로드합니다.
   *
   * @tags Transport Order
   * @name DownloadOrderFormExcel
   * @summary 운송 주문 엑셀 양식 다운로드
   * @request GET:/api/transport-order/excel-example
   * @secure
   * @response `200` `DownloadOrderFormExcelData` 엑셀 다운로드 성공
   * @response `401` `void` 권한 없음
   */
  downloadOrderFormExcel = (params: RequestParams = {}) =>
    this.request<DownloadOrderFormExcelData, void>({
      path: `/api/transport-order/excel-example`,
      method: "GET",
      secure: true,
      ...params,
    });
}
