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
  AddCenterData,
  AddCenterError,
  CenterRequest,
  UpdateCenterData,
  UpdateCenterError,
  UpdateCenterRequest,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Center<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 센터를 추가합니다. (화면 설계서 상 사용되지 않을 기능이지만 개발 상의 편의를 위하여 추가합니다.)
   *
   * @tags Center
   * @name AddCenter
   * @summary 센터 추가
   * @request POST:/api/center
   * @secure
   * @response `200` `AddCenterData` 센터 추가 성공
   * @response `403` `ErrorResponse` 권한 없음
   * @response `404` `ErrorResponse` 존재하지 않는 센터
   */
  addCenter = (data: CenterRequest, params: RequestParams = {}) =>
    this.request<AddCenterData, AddCenterError>({
      path: `/api/center`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 센터에 대한 상세정보를 변경합니다.
   *
   * @tags Center
   * @name UpdateCenter
   * @summary 센터 상세정보 변경
   * @request PATCH:/api/center/{centerId}
   * @secure
   * @response `200` `UpdateCenterData` 센터 상세정보 변경 성공
   * @response `403` `CenterRequest` 권한 없음
   * @response `404` `ErrorResponse` 존재하지 않는 센터
   */
  updateCenter = (centerId: number, data: UpdateCenterRequest, params: RequestParams = {}) =>
    this.request<UpdateCenterData, UpdateCenterError>({
      path: `/api/center/${centerId}`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
