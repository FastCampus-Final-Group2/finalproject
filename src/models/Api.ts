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
  AddDeliveryDestinationData,
  CancelDispatchData,
  CancelDispatchDetailData,
  CancelDispatchDetailError,
  CancelDispatchDetailPayload,
  CenterRequest,
  ConfirmDispatchData,
  DeliveryDestinationRequest,
  DispatchCancelRequest,
  DispatchConfirmRequest,
  DispatchNumberSearchRequest,
  DispatchUpdateRequest,
  DownloadOrderFormExcelData,
  GetCenterOrDeliveryDestinationInfoData,
  GetDispatchDetailData,
  GetDispatchDetailError,
  GetDispatchListData,
  GetDispatchListError,
  GetTransportOrderByIdData,
  GetTransportOrderByIdError,
  IssueRequest,
  LoginData,
  LoginRequest,
  LogoutData,
  RegisterAdminData,
  RegisterAdminRequest,
  RegisterDriverData,
  RegisterDriverRequest,
  SearchDispatchesData,
  TransportOrderRequest,
  TransportOrderToDispatchData,
  TransportOrderToDispatchError,
  UpdateCenterData,
  UpdateCenterError,
  UpdateCenterRequest,
  UpdateDeliveryDestinationData,
  UpdateDeliveryDestinationError,
  UpdateDeliveryDestinationRequest,
  UpdateDispatchData,
  UpdateDispatchError,
  UpdateIssueData,
  UpdateIssueError,
  ValidateSmNameAndSmIdsData,
  ValidateSmNameAndSmIdsError,
  ValidationListRequest,
  WithdrawData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class Api<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
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
   * @description 기사를 등록합니다.
   *
   * @tags User
   * @name RegisterDriver
   * @summary SM 등록
   * @request POST:/api/users/register/driver
   * @secure
   * @response `200` `RegisterDriverData` OK
   */
  registerDriver = (data: RegisterDriverRequest, params: RequestParams = {}) =>
    this.request<RegisterDriverData, any>({
      path: `/api/users/register/driver`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 관리자를 등록합니다.
   *
   * @tags User
   * @name RegisterAdmin
   * @summary 관리자 등록
   * @request POST:/api/users/register/admin
   * @secure
   * @response `200` `RegisterAdminData` OK
   */
  registerAdmin = (data: RegisterAdminRequest, params: RequestParams = {}) =>
    this.request<RegisterAdminData, any>({
      path: `/api/users/register/admin`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
  /**
   * @description 로그인을 시도합니다.
   *
   * @tags User
   * @name Login
   * @summary 사용자 로그인
   * @request POST:/api/users/login
   * @secure
   * @response `200` `LoginData` OK
   */
  login = (data: LoginRequest, params: RequestParams = {}) =>
    this.request<LoginData, any>({
      path: `/api/users/login`,
      method: "POST",
      body: data,
      secure: true,
      type: ContentType.Json,
      ...params,
    });
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
  /**
   * @description 사용자를 삭제합니다.
   *
   * @tags User
   * @name Withdraw
   * @summary 사용자 삭제
   * @request GET:/api/users/withdraw
   * @secure
   * @response `200` `WithdrawData` OK
   */
  withdraw = (params: RequestParams = {}) =>
    this.request<WithdrawData, any>({
      path: `/api/users/withdraw`,
      method: "GET",
      secure: true,
      ...params,
    });
  /**
   * @description 로그아웃을 시도합니다.
   *
   * @tags User
   * @name Logout
   * @summary 사용자 로그아웃
   * @request GET:/api/users/logout
   * @secure
   * @response `200` `LogoutData` OK
   */
  logout = (params: RequestParams = {}) =>
    this.request<LogoutData, any>({
      path: `/api/users/logout`,
      method: "GET",
      secure: true,
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
