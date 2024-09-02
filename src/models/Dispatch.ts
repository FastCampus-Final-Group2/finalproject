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
  CancelDispatchData,
  ConfirmDispatchData,
  DispatchCancelRequest,
  DispatchConfirmRequest,
  DispatchUpdateRequest,
  IssueRequest,
  UpdateDispatchData,
  UpdateDispatchError,
  UpdateIssueData,
  UpdateIssueError,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Dispatch<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
  /**
   * @description 배차 탭에서 배차 변경을 합니다. (DispatchUpdateRequest, DispatchUpdateResponse)
   *
   * @tags Dispatch
   * @name UpdateDispatch
   * @summary 배차 변경
   * @request PUT:/api/dispatch
   * @secure
   * @response `200` `UpdateDispatchData` 배차 변경 성공
   * @response `400` `ErrorResponse` bad request
   * @response `401` `ErrorResponse` 권한 없음
   * @response `500` `ErrorResponse` 서버 에러
   */
  updateDispatch = (data: DispatchUpdateRequest, params: RequestParams = {}) =>
    this.request<UpdateDispatchData, UpdateDispatchError>({
      path: `/api/dispatch`,
      method: "PUT",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 배차를 확정하여 데이터베이스에 저장합니다.
   *
   * @tags Dispatch
   * @name ConfirmDispatch
   * @summary 배차 확정
   * @request POST:/api/dispatch
   * @secure
   * @response `200` `ConfirmDispatchData` 배차 확정 성공
   */
  confirmDispatch = (data: DispatchConfirmRequest, params: RequestParams = {}) =>
    this.request<ConfirmDispatchData, any>({
      path: `/api/dispatch`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 차량관제 탭에서 배차 삭제를 합니다.
   *
   * @tags Dispatch
   * @name CancelDispatch
   * @summary 차량관제 탭, 배차 삭제
   * @request PATCH:/api/dispatch
   * @secure
   * @response `200` `CancelDispatchData` OK
   */
  cancelDispatch = (data: DispatchCancelRequest, params: RequestParams = {}) =>
    this.request<CancelDispatchData, any>({
      path: `/api/dispatch`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 배송 이슈를 등록합니다.
   *
   * @tags Dispatch
   * @name UpdateIssue
   * @summary 배송 이슈
   * @request PATCH:/api/dispatch/{dispatchId}/issue
   * @secure
   * @response `200` `UpdateIssueData` 이슈 내용 변경 성공
   * @response `401` `ErrorResponse` 권한 없음
   * @response `404` `ErrorResponse` 배차가 존재하지 않음
   */
  updateIssue = (dispatchId: number, data: IssueRequest, params: RequestParams = {}) =>
    this.request<UpdateIssueData, UpdateIssueError>({
      path: `/api/dispatch/${dispatchId}/issue`,
      method: "PATCH",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
}
