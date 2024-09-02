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
  LoginData,
  LoginRequest,
  LogoutData,
  RegisterAdminData,
  RegisterAdminRequest,
  RegisterDriverData,
  RegisterDriverRequest,
  WithdrawData,
} from "./data-contracts";
import { ContentType, HttpClient, RequestParams } from "./http-client";

export class User<SecurityDataType = unknown> extends HttpClient<SecurityDataType> {
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
}
