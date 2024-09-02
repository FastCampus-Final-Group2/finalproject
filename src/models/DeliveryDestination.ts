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
  AddDeliveryDestinationData,
  DeliveryDestinationRequest,
  GetCenterOrDeliveryDestinationInfoData,
  UpdateDeliveryDestinationData,
  UpdateDeliveryDestinationError,
  UpdateDeliveryDestinationRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class DeliveryDestination<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 배송처를 추가합니다. (화면 설계서 상 사용되지 않을 기능이지만 개발 상의 편의를 위하여 추가합니다.)"
   *
   * @tags Delivery Destination
   * @name AddDeliveryDestination
   * @summary 배송처 추가
   * @request POST:/api/delivery-destination
   * @secure
   * @response `200` `AddDeliveryDestinationData` OK
   */
  addDeliveryDestination = (data: DeliveryDestinationRequest, params: RequestParams = {}) =>
    this.request<AddDeliveryDestinationData, any>({
      path: `/api/delivery-destination`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 배송처에 대한 상세정보를 변경합니다.
   *
   * @tags Delivery Destination
   * @name UpdateDeliveryDestination
   * @summary 배송처 상세정보 변경
   * @request PATCH:/api/delivery-destination/{deliveryDestinationId}
   * @secure
   * @response `200` `UpdateDeliveryDestinationData` 배송처 상세정보 변경 성공
   * @response `403` `ErrorResponse` 권한 없음
   * @response `404` `ErrorResponse` 존재하지 않는 배송처
   */
  updateDeliveryDestination = (
    deliveryDestinationId: number,
    data: UpdateDeliveryDestinationRequest,
    params: RequestParams = {},
  ) =>
    this.request<UpdateDeliveryDestinationData, UpdateDeliveryDestinationError>({
      path: `/api/delivery-destination/${deliveryDestinationId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 센터 또는 배송처의 상제 정보를 조회합니다.
   *
   * @tags Delivery Destination
   * @name GetCenterOrDeliveryDestinationInfo
   * @summary 센터/배송처 상세 정보 조회
   * @request GET:/api/delivery-destination/{placeId}
   * @secure
   * @response `200` `GetCenterOrDeliveryDestinationInfoData` OK
   */
  getCenterOrDeliveryDestinationInfo = (
    placeId: number,
    query: {
      "is-center": boolean;
    },
    params: RequestParams = {},
  ) =>
    this.request<GetCenterOrDeliveryDestinationInfoData, any>({
      path: `/api/delivery-destination/${placeId}`,
      method: "GET",
      query: query,
      secure: true,
      ...params,
    });
}
