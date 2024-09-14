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

/** 배차 변경 요청 정보 */
export interface DispatchUpdateRequest {
  /**
   * 기사id
   * @format int64
   * @example 1
   */
  smId: number;
  /**
   * 상차 시작 시간
   * @format date-time
   */
  loadingStartTime: string;
  orderList?: Order[];
}

/**
 * 휴식 종료 시간
 * @example "15:00"
 */
export interface LocalTime {
  /** @format int32 */
  hour?: number;
  /** @format int32 */
  minute?: number;
  /** @format int32 */
  second?: number;
  /** @format int32 */
  nano?: number;
}

export interface Order {
  /**
   * 주소
   * @example "충남 천안시 서북구 백석로 123"
   */
  roadAddress: string;
  /**
   * 상세 주소
   * @example "지하 1층"
   */
  detailAddress: string;
  /**
   * 위도
   * @format double
   * @example 36.4501
   */
  lat: number;
  /**
   * 경도
   * @format double
   * @example 127.1234
   */
  lon: number;
  /**
   * 예상 작업시간
   * @format int32
   * @example 60
   */
  expectedServiceDuration: number;
  /**
   * 희망 도착일
   * @format date
   * @example "2024-06-15"
   */
  serviceRequestDate: string;
  /** 휴식 종료 시간 */
  serviceRequestTime: LocalTime;
}

export interface ErrorResponse {
  detailMessageArguments?: object[];
  typeMessageCode?: string;
  detailMessageCode?: string;
  titleMessageCode?: string;
  body?: ProblemDetail;
  statusCode?: HttpStatusCode;
  headers?: {
    empty?: boolean;
    /** @format uri */
    location?: string;
    host?: {
      address?: {
        hostAddress?: string;
        /** @format byte */
        address?: string;
        hostName?: string;
        linkLocalAddress?: boolean;
        multicastAddress?: boolean;
        anyLocalAddress?: boolean;
        loopbackAddress?: boolean;
        siteLocalAddress?: boolean;
        mcglobal?: boolean;
        mcnodeLocal?: boolean;
        mclinkLocal?: boolean;
        mcsiteLocal?: boolean;
        mcorgLocal?: boolean;
        canonicalHostName?: string;
      };
      /** @format int32 */
      port?: number;
      unresolved?: boolean;
      hostName?: string;
      hostString?: string;
    };
    all?: Record<string, string>;
    /** @format int64 */
    lastModified?: number;
    /** @format int64 */
    contentLength?: number;
    /** @format int64 */
    date?: number;
    acceptLanguage?: {
      range?: string;
      /** @format double */
      weight?: number;
    }[];
    basicAuth?: string;
    acceptLanguageAsLocales?: {
      language?: string;
      script?: string;
      variant?: string;
      displayName?: string;
      country?: string;
      /** @uniqueItems true */
      unicodeLocaleAttributes?: string[];
      /** @uniqueItems true */
      unicodeLocaleKeys?: string[];
      displayLanguage?: string;
      displayScript?: string;
      displayCountry?: string;
      displayVariant?: string;
      /** @uniqueItems true */
      extensionKeys?: string[];
      iso3Language?: string;
      iso3Country?: string;
    }[];
    accessControlAllowCredentials?: boolean;
    accessControlAllowHeaders?: string[];
    accessControlAllowMethods?: HttpMethod[];
    accessControlAllowOrigin?: string;
    accessControlExposeHeaders?: string[];
    /** @format int64 */
    accessControlMaxAge?: number;
    accessControlRequestHeaders?: string[];
    accept?: MediaType[];
    acceptPatch?: MediaType[];
    accessControlRequestMethod?: HttpMethod;
    /** @format int64 */
    ifUnmodifiedSince?: number;
    acceptCharset?: string[];
    /** @uniqueItems true */
    allow?: HttpMethod[];
    bearerAuth?: string;
    connection?: string[];
    contentLanguage?: {
      language?: string;
      script?: string;
      variant?: string;
      displayName?: string;
      country?: string;
      /** @uniqueItems true */
      unicodeLocaleAttributes?: string[];
      /** @uniqueItems true */
      unicodeLocaleKeys?: string[];
      displayLanguage?: string;
      displayScript?: string;
      displayCountry?: string;
      displayVariant?: string;
      /** @uniqueItems true */
      extensionKeys?: string[];
      iso3Language?: string;
      iso3Country?: string;
    };
    etag?: string;
    /** @format int64 */
    expires?: number;
    ifMatch?: string[];
    ifNoneMatch?: string[];
    pragma?: string;
    upgrade?: string;
    vary?: string[];
    contentDisposition?: ContentDisposition;
    origin?: string;
    cacheControl?: string;
    range?: HttpRange[];
    contentType?: MediaType;
    /** @format int64 */
    ifModifiedSince?: number;
    [key: string]: any;
  };
}

export interface DispatchDetailResponse {
  /**
   * 기사 명
   * @example "1"
   */
  smName?: string;
  /**
   * 기사 전화번호
   * @example "010-1234-5678"
   */
  smPhoneNumber?: string;
  /**
   * 용적률
   * @format double
   * @example 80
   */
  floorAreaRatio?: number;
  /**
   * 차종
   * @example "WING_BODY"
   */
  vehicleType?: "WING_BODY" | "BOX" | "CARGO";
  /**
   * 차량 톤
   * @format double
   * @example 5
   */
  vehicleTon?: number;
  /**
   * 진행률
   * @format int32
   * @example 75
   */
  progressionRate?: number;
  /**
   * 완료주문
   * @format int32
   * @example 10
   */
  completedOrderCount?: number;
  /**
   * 주문 수
   * @format int32
   * @example 20
   */
  deliveryOrderCount?: number;
  /**
   * 총 주행 거리
   * @format double
   * @example 20.8
   */
  totalDistance?: number;
  /** 휴식 종료 시간 */
  totalTime?: LocalTime;
  /**
   * 이슈 및 메모
   * @example "No issues"
   */
  issue?: string;
  /** 휴식 종료 시간 */
  breakStartTime?: LocalTime;
  /** 휴식 종료 시간 */
  breakEndTime?: LocalTime;
  /**
   * 휴식 경유지 위치 (해당 경유지의 바로 앞)
   * @format int32
   * @example 3
   */
  restingStopover?: number;
  startStopover?: StartStopover;
  dispatchDetailList?: DispatchDetail[];
}

export interface DispatchUpdateResponse {
  /**
   * 주행거리 (km)
   * @format double
   * @example 30.5
   */
  mileage?: number;
  /**
   * 주행시간 (분)
   * @format int64
   * @example 34
   */
  totalTime?: number;
  /** 휴식 종료 시간 */
  breakStartTime?: LocalTime;
  /** 휴식 종료 시간 */
  breakEndTime?: LocalTime;
  /**
   * 휴식경유지(해당경유지로 이동중)
   * @format int32
   * @example 3
   */
  restingStopover?: number;
  /**
   * 최대 계약 초과 오류
   * @example true
   */
  maxContractOver?: boolean;
  /**
   * 전체 주문 or 거리
   * @format int32
   * @example 20
   */
  totalOrderOrDistanceNum?: number;
  /**
   * 가용 주문
   * @format int32
   * @example 80
   */
  availableNum?: number;
  /**
   * 배송 유형
   * @example "지입"
   */
  contractType?: string;
  startStopover?: StartStopover;
  dispatchDetailList?: DispatchDetailResponse[];
  /** 경로 좌표 리스트 */
  coordinates?: Record<string, number>[];
  restricted?: boolean;
}

export interface StartStopover {
  /**
   * 센터 ID
   * @format int64
   * @example 1
   */
  centerId?: number;
  /**
   * 센터 이름
   * @example "Main Center"
   */
  centerName?: string;
  /**
   * 위도
   * @format double
   * @example 37.5995
   */
  lat?: number;
  /**
   * 경도
   * @format double
   * @example 127.1116
   */
  lon?: number;
  /**
   * 운송 시작 시간
   * @format date-time
   */
  departureTime?: string;
}

export interface RegisterSuperAdminRequest {
  /**
   * 관리자 이름
   * @example "John Doe"
   */
  name: string;
  /**
   * 관리자 ID
   * @example "superAdmin"
   */
  username: string;
  /**
   * 관리자 PW
   * @example "password"
   */
  password: string;
  /**
   * 관리자 전화번호
   * @example "010-1234-5678"
   */
  phoneNumber: string;
}

export interface RegisterDriverRequest {
  /**
   * 센터 ID
   * @format int64
   * @example 1
   */
  centerId: number;
  /**
   * SM ID
   * @format int64
   * @example 1
   */
  smId: number;
  /**
   * 기사 이름
   * @example "John Smith"
   */
  name: string;
  /**
   * 기사 ID
   * @example "driver"
   */
  username: string;
  /**
   * 기사 PW
   * @example "password"
   */
  password: string;
  /**
   * 기사 전화번호
   * @example "010-9876-5432"
   */
  phoneNumber: string;
}

export interface RegisterAdminRequest {
  /**
   * 센터 ID
   * @format int64
   * @example 1
   */
  centerId: number;
  /**
   * 관리자 이름
   * @example "John Doe"
   */
  name: string;
  /**
   * 관리자 ID
   * @example "admin"
   */
  username: string;
  /**
   * 관리자 PW
   * @example "password"
   */
  password: string;
  /**
   * 관리자 전화번호
   * @example "010-1234-5678"
   */
  phoneNumber: string;
}

export interface LoginRequest {
  /**
   * 사용자 ID
   * @example "admin"
   */
  username: string;
  /**
   * 사용자 PW
   * @example "password"
   */
  password: string;
}

/**
 * 주문 목록
 * @example [{"deliveryType":"택배","smId":123,"smName":"홍길동","shipmentNumber":"1234567890","clientOrderKey":"A123456789","orderType":"배송","receivedDate":"2024-05-01","serviceRequestDate":"2024-05-02","serviceRequestTime":"14:00","clientName":"김철수","contact":"010-1234-5678","address":"서울특별시 강남구 테헤란로 123","detailAddress":"아파트 101호","zipcode":"06101","volume":2.5,"weight":10,"note":"문 앞에 놔주세요","expectedServiceDuration":30,"productName":"전자제품","productCode":"P123456","productQuantity":5},{"deliveryType":"지입","smId":124,"smName":"이영희","shipmentNumber":"0987654321","clientOrderKey":"B987654321","orderType":"수거","receivedDate":"2024-06-01","serviceRequestDate":"2024-06-03","serviceRequestTime":"10:00","clientName":"박영수","contact":"010-9876-5432","address":"서울특별시 서초구 반포대로 200","detailAddress":"빌라 203호","zipcode":"06500","volume":3,"weight":15,"note":"빠른 수거 부탁드립니다","expectedServiceDuration":20,"productName":"가전제품","productCode":"G987654","productQuantity":2}]
 */
export interface OrderRequest {
  /**
   * 배송유형: '지입', '택배'
   * @example "택배"
   */
  deliveryType: string;
  /**
   * 기사 ID
   * @format int64
   * @example 123
   */
  smId: number;
  /**
   * 기사 이름
   * @example "홍길동"
   */
  smName: string;
  /**
   * 운송장 번호
   * @example "1234567890"
   */
  shipmentNumber: string;
  /**
   * 업체 주문 번호
   * @example "A123456789"
   */
  clientOrderKey?: string;
  /**
   * 주문유형: '배송', '수거'
   * @example "배송"
   */
  orderType: string;
  /**
   * 주문 접수일
   * @format date
   * @example "2024-05-01"
   */
  receivedDate: string;
  /**
   * 작업 희망일
   * @format date
   * @example "2024-05-02"
   */
  serviceRequestDate: string;
  /** 휴식 종료 시간 */
  serviceRequestTime: LocalTime;
  /**
   * 고객명
   * @example "김철수"
   */
  clientName: string;
  /**
   * 고객 연락처
   * @example "010-1234-5678"
   */
  contact: string;
  /**
   * 주소
   * @example "서울특별시 강남구 테헤란로 123"
   */
  address: string;
  /**
   * 상세 주소
   * @example "아파트 101호"
   */
  detailAddress: string;
  /**
   * 우편번호
   * @example "06101"
   */
  zipcode: string;
  /**
   * 볼륨 (단위: m³)
   * @format double
   * @example 2.5
   */
  volume: number;
  /**
   * 중량 (단위: kg)
   * @format double
   * @example 10
   */
  weight: number;
  /**
   * 고객 전달 사항
   * @example "문 앞에 놔주세요"
   */
  note?: string;
  /**
   * 예상 작업 시간 (단위: 분)
   * @format int32
   * @example 30
   */
  expectedServiceDuration?: number;
  /**
   * 상품명
   * @example "전자제품"
   */
  productName: string;
  /**
   * 상품 코드
   * @example "P123456"
   */
  productCode?: string;
  /**
   * 상품 수량
   * @format int32
   * @example 5
   */
  productQuantity: number;
}

export interface TransportOrderRequest {
  /**
   * 상차 시작 시간
   * @format date-time
   */
  loadingStartTime: string;
  /**
   * 배차 이름
   * @example "배차1"
   */
  dispatchName: string;
  /**
   * 주문 목록
   * @example [{"deliveryType":"택배","smId":123,"smName":"홍길동","shipmentNumber":"1234567890","clientOrderKey":"A123456789","orderType":"배송","receivedDate":"2024-05-01","serviceRequestDate":"2024-05-02","serviceRequestTime":"14:00","clientName":"김철수","contact":"010-1234-5678","address":"서울특별시 강남구 테헤란로 123","detailAddress":"아파트 101호","zipcode":"06101","volume":2.5,"weight":10,"note":"문 앞에 놔주세요","expectedServiceDuration":30,"productName":"전자제품","productCode":"P123456","productQuantity":5},{"deliveryType":"지입","smId":124,"smName":"이영희","shipmentNumber":"0987654321","clientOrderKey":"B987654321","orderType":"수거","receivedDate":"2024-06-01","serviceRequestDate":"2024-06-03","serviceRequestTime":"10:00","clientName":"박영수","contact":"010-9876-5432","address":"서울특별시 서초구 반포대로 200","detailAddress":"빌라 203호","zipcode":"06500","volume":3,"weight":15,"note":"빠른 수거 부탁드립니다","expectedServiceDuration":20,"productName":"가전제품","productCode":"G987654","productQuantity":2}]
   */
  orderReuquestList: OrderRequest[];
}

/** 경로의 좌표 리스트 */
export interface CoordinatesResponse {
  /**
   * 경도
   * @format double
   * @example 126.978
   */
  lon?: number;
  /**
   * 위도
   * @format double
   * @example 37.5665
   */
  lat?: number;
}

/** 경로의 상세 정보 리스트 */
export interface CourseDetailResponse {
  /**
   * 톤코드 오류 여부
   * @example false
   */
  restrictedTonCode?: boolean;
  /**
   * 요청 시간 지연 여부
   * @example false
   */
  delayRequestTime?: boolean;
  /**
   * 계약 초과 오류 여부
   * @example false
   */
  overContractNum?: boolean;
  /**
   * 예상 이동 시간 (분)
   * @format int32
   * @example 30
   */
  ett?: number;
  /**
   * 예상 작업 시작 시간
   * @format date-time
   */
  expectationOperationStartTime?: string;
  /**
   * 예상 작업 종료 시간
   * @format date-time
   */
  expectationOperationEndTime?: string;
  /**
   * 배송처 ID
   * @format int64
   * @example 456
   */
  deliveryDestinationId?: number;
  /**
   * 담당자 이름
   * @example "이영희"
   */
  managerName?: string;
  /**
   * 담당자 전화번호
   * @example "010-9876-5432"
   */
  phoneNumber?: string;
  /**
   * 경유지 위도
   * @format double
   * @example 37.5665
   */
  lat?: number;
  /**
   * 경유지 경도
   * @format double
   * @example 126.978
   */
  lon?: number;
  /**
   * 이동 거리 (km)
   * @format double
   * @example 20
   */
  distance?: number;
  /**
   * 배송유형
   * @example "택배"
   */
  deliveryType?: string;
  /**
   * 기사 ID
   * @format int64
   * @example 123
   */
  smId?: number;
  /**
   * 기사 이름
   * @example "홍길동"
   */
  smName?: string;
  /**
   * 운송장 번호
   * @example "1234567890"
   */
  shipmentNumber?: string;
  /**
   * 업체 주문 번호
   * @example "A123456789"
   */
  clientOrderKey?: string;
  /**
   * 주문 유형
   * @example "배송"
   */
  orderType?: string;
  /**
   * 주문 접수일
   * @format date
   * @example "2024-05-01"
   */
  receivedDate?: string;
  /**
   * 작업 희망일
   * @format date
   * @example "2024-05-02"
   */
  serviceRequestDate?: string;
  /** 휴식 종료 시간 */
  serviceRequestTime?: LocalTime;
  /**
   * 고객 이름
   * @example "김철수"
   */
  clientName?: string;
  /**
   * 고객 연락처
   * @example "010-1234-5678"
   */
  contact?: string;
  /**
   * 도로명 주소
   * @example "서울 강남구 테헤란로 123"
   */
  roadAddress?: string;
  /**
   * 지번 주소
   * @example "서울특별시 강남구 테헤란로 123"
   */
  lotNumberAddress?: string;
  /**
   * 상세 주소
   * @example "아파트 101호"
   */
  detailAddress?: string;
  /**
   * 우편번호
   * @example "06101"
   */
  zipcode?: string;
  /**
   * 볼륨
   * @format double
   * @example 2.5
   */
  volume?: number;
  /**
   * 중량
   * @format double
   * @example 10
   */
  weight?: number;
  /**
   * 고객 전달 사항
   * @example "문 앞에 놔주세요"
   */
  note?: string;
  /**
   * 예상 작업 시간 (분)
   * @format int32
   * @example 30
   */
  expectedServiceDuration?: number;
  /**
   * 상품명
   * @example "전자제품"
   */
  productName?: string;
  /**
   * 상품 코드
   * @example "P123456"
   */
  productCode?: string;
  /**
   * 상품 수량
   * @format int32
   * @example 5
   */
  productQuantity?: number;
}

export interface CourseResponse {
  /**
   * 전체 주문의 수 or 거리
   * @format int32
   * @example 20
   */
  totalOrderOrDistanceNum?: number;
  /**
   * 가용주문 수 or 거리
   * @format int32
   * @example 80
   */
  availableNum?: number;
  /**
   * 오류 여부
   * @example false
   */
  errorYn?: boolean;
  /**
   * 기사 ID
   * @format int64
   * @example 123
   */
  smId?: number;
  /**
   * 기사 이름
   * @example "홍길동"
   */
  smName?: string;
  /**
   * 기사 전화번호
   * @example "010-1234-5678"
   */
  smPhoneNumber?: string;
  /**
   * 차량 종류
   * @example "WING_BODY"
   */
  vehicleType?: string;
  /**
   * 차량 톤
   * @format double
   * @example 2.5
   */
  vehicleTon?: number;
  /**
   * 주문 수
   * @format int32
   * @example 10
   */
  orderNum?: number;
  /**
   * 주행 거리 (km)
   * @format int32
   * @example 150
   */
  mileage?: number;
  /**
   * 주행 시간 (분)
   * @format int32
   * @example 120
   */
  totalTime?: number;
  /**
   * 용적률
   * @format int32
   * @example 75
   */
  floorAreaRatio?: number;
  /** 휴식 종료 시간 */
  breakStartTime?: LocalTime;
  /** 휴식 종료 시간 */
  breakEndTime?: LocalTime;
  /**
   * 휴식 경유지 위치
   * @format int32
   * @example 2
   */
  restingPosition?: number;
  /** 경로의 상세 정보 리스트 */
  courseDetailResponseList?: CourseDetailResponse[];
  /** 경로의 좌표 리스트 */
  coordinatesResponseList?: CoordinatesResponse[];
}

export interface DispatchResponse {
  /**
   * 배차코드 = 배차번호
   * @example "D123456789"
   */
  dispatchCode?: string;
  /**
   * 배차명
   * @example "배차1"
   */
  dispatchName?: string;
  /**
   * 총 주문
   * @format int32
   * @example 100
   */
  totalOrder?: number;
  /**
   * 오류주문 수
   * @format int32
   * @example 5
   */
  totalErrorNum?: number;
  /**
   * 총 예상시간 (분)
   * @format int32
   * @example 480
   */
  totalTime?: number;
  /**
   * 총 용적률
   * @format int32
   * @example 85
   */
  totalFloorAreaRatio?: number;
  /**
   * 상차 시작 시간
   * @format date-time
   */
  loadingStartTime?: string;
  /**
   * 배송 유형
   * @example "지입"
   */
  contractType?: string;
  startStopoverResponse?: StartStopoverResponse;
  course?: CourseResponse[];
}

export interface StartStopoverResponse {
  /**
   * 센터 ID (출발지)
   * @format int64
   * @example 123
   */
  centerId?: number;
  /**
   * 출발지 이름
   * @example "물류센터"
   */
  centerName?: string;
  /**
   * 출발지 위도
   * @format double
   * @example 37.5409
   */
  lat?: number;
  /**
   * 출발지 경도
   * @format double
   * @example 127.1263
   */
  lon?: number;
  /** 휴식 종료 시간 */
  expectedServiceDuration?: LocalTime;
  /**
   * 첫 경유지로 운송 시작 시간
   * @format date-time
   */
  departureTime?: string;
}

export interface ContentDisposition {
  type?: string;
  name?: string;
  filename?: string;
  charset?: string;
  /**
   * @deprecated
   * @format int64
   */
  size?: number;
  /**
   * @deprecated
   * @format date-time
   */
  creationDate?: string;
  /**
   * @deprecated
   * @format date-time
   */
  modificationDate?: string;
  /**
   * @deprecated
   * @format date-time
   */
  readDate?: string;
  attachment?: boolean;
  formData?: boolean;
  inline?: boolean;
}

export type HttpMethod = object;

export type HttpRange = object;

export interface HttpStatusCode {
  error?: boolean;
  is4xxClientError?: boolean;
  is5xxServerError?: boolean;
  is1xxInformational?: boolean;
  is2xxSuccessful?: boolean;
  is3xxRedirection?: boolean;
}

export interface MediaType {
  type?: string;
  subtype?: string;
  parameters?: Record<string, string>;
  /** @format double */
  qualityValue?: number;
  wildcardSubtype?: boolean;
  subtypeSuffix?: string;
  wildcardType?: boolean;
  concrete?: boolean;
  charset?: string;
}

export interface ProblemDetail {
  /** @format uri */
  type?: string;
  title?: string;
  /** @format int32 */
  status?: number;
  detail?: string;
  /** @format uri */
  instance?: string;
  properties?: Record<string, object>;
}

/**
 * 기사 이름과 ID 검증 요청 목록
 * @example [{"smName":"홍길동"},{"smName":"이영희"}]
 */
export interface SmNameRequest {
  /**
   * 기사 이름
   * @example "홍길동"
   */
  smName: string;
}

export interface ValidationListRequest {
  /**
   * 기사 이름과 ID 검증 요청 목록
   * @example [{"smName":"홍길동"},{"smName":"이영희"}]
   */
  requests: SmNameRequest[];
}

export interface SmNameAndSmIdResponse {
  /** 기사 검증 리스트 */
  validList: ValidList[];
}

/** 기사 검증 리스트 */
export interface ValidList {
  /**
   * 기사명 검증
   * @example true
   */
  smNameValid: boolean;
  /**
   * 기사 ID
   * @format int32
   * @example 1
   */
  smId: number;
}

/**
 * 상세 경로 좌표
 * @example [{"lon":127.1116,"lat":37.5995},{"lon":127.112,"lat":37.6},{"lon":127.1135,"lat":37.6012}]
 */
export interface Coordinate {
  /** @format double */
  lon?: number;
  /** @format double */
  lat?: number;
}

export interface DispatchConfirmRequest {
  /**
   * 배차 코드 (배차 번호)
   * @example "240808C001#1"
   */
  dispatchCode: string;
  /**
   * 배차명
   * @example "인플루언서 A 긴급건"
   */
  dispatchName: string;
  /**
   * 상차 시작 시간
   * @format date-time
   */
  loadingStartTime: string;
  /** 경로별 리스트 */
  dispatchList: DispatchList[];
}

/** 배송 상세 리스트 */
export interface DispatchDetailList {
  /**
   * 기사 이름
   * @example "홍길동"
   */
  smName?: string;
  /**
   * 예상 이동 시간 (분)
   * @format int32
   * @example 30
   */
  ett?: number;
  /**
   * 예상 작업 시작 시간
   * @format date-time
   */
  expectationOperationStartTime?: string;
  /**
   * 예상 작업 종료 시간
   * @format date-time
   */
  expectationOperationEndTime?: string;
  /**
   * 배송처 ID
   * @format int64
   * @example 1
   */
  deliveryDestinationId?: number;
  /**
   * 고객 전화번호
   * @example "010-1234-5678"
   */
  phoneNumber?: string;
  /**
   * 주문 번호
   * @example "ORD123456"
   */
  orderNumber?: string;
  /**
   * 주문접수일
   * @format date
   * @example "2024-08-08"
   */
  orderDate?: string;
  /**
   * 경유지 위도
   * @format double
   * @example 37.5995
   */
  lat?: number;
  /**
   * 경유지 경도
   * @format double
   * @example 127.1116
   */
  lon?: number;
  /**
   * 이동 거리 (km)
   * @format double
   * @example 3.3
   */
  distance?: number;
  /**
   * 배송 유형 (지입, 용차, 택배)
   * @example "택배"
   */
  deliveryType?: string;
  /**
   * 운송장 번호
   * @example "C0029384889"
   */
  shipmentNumber?: string;
  /**
   * 주문 유형 (배송, 수거)
   * @example "배송"
   */
  orderType?: string;
  /**
   * 작업 희망일
   * @format date
   * @example "2023-08-28"
   */
  serviceRequestDate?: string;
  /** 휴식 종료 시간 */
  serviceRequestTime?: LocalTime;
  /**
   * 고객 이름
   * @example "홍길동"
   */
  clientName?: string;
  /**
   * 주소
   * @example "서울특별시 강남구 강남동 37"
   */
  lotNumberAddress?: string;
  /**
   * 도로명 주소
   * @example "서울특별시 강남구 강남대로 123"
   */
  roadAddress?: string;
  /**
   * 상세 주소
   * @example "강남빌딩 3층"
   */
  detailAddress?: string;
  /**
   * 우편번호
   * @example "06000"
   */
  zipcode?: string;
  /**
   * 볼륨 (m³)
   * @format double
   * @example 1.5
   */
  volume?: number;
  /**
   * 중량 (kg)
   * @format double
   * @example 10
   */
  weight?: number;
  /**
   * 고객 전달 사항
   * @example "조심히 다뤄주세요."
   */
  note?: string;
  /**
   * 예상 작업 시간 (분)
   * @format int32
   * @example 20
   */
  expectedServiceDuration?: number;
  /**
   * 상품명
   * @example "상품명 A"
   */
  productName?: string;
  /**
   * 상품 코드
   * @example "ST05"
   */
  productCode?: string;
  /**
   * 상품 수량
   * @format int32
   * @example 3
   */
  productQuantity?: number;
}

/** 경로별 리스트 */
export interface DispatchList {
  /**
   * 기사 ID
   * @format int64
   * @example 1
   */
  smId?: number;
  /** 휴식 종료 시간 */
  breakStartTime?: LocalTime;
  /** 휴식 종료 시간 */
  breakEndTime?: LocalTime;
  /**
   * 휴식 경유지 위치 (해당 경유지의 바로 앞)
   * @format int32
   * @example 4
   */
  restingStopover?: number;
  /** 배송 상세 리스트 */
  dispatchDetailList?: DispatchDetailList[];
  /**
   * 상세 경로 좌표
   * @example [{"lon":127.1116,"lat":37.5995},{"lon":127.112,"lat":37.6},{"lon":127.1135,"lat":37.6012}]
   */
  coordinates?: Coordinate[];
}

export interface DeliveryDestinationRequest {
  /**
   * 센터 ID
   * @format int64
   * @example 1
   */
  centerId?: number;
  /**
   * 배송처 이름
   * @example "충남정보센터"
   */
  destinationName?: string;
  /**
   * 도로명 주소
   * @example "충남 논산시 중앙대로 374번길 41-11"
   */
  roadAddress?: string;
  /**
   * 지번 주소
   * @example "충남 논산시 중앙동 41"
   */
  lotNumberAddress?: string;
  /**
   * 상세주소
   * @example "1층 물류센터"
   */
  detailAddress?: string;
  /**
   * 우편번호
   * @example "32934"
   */
  zipCode?: string;
  /**
   * 담당자명
   * @example "김물류"
   */
  adminName?: string;
  /**
   * 연락처
   * @example "01012345678"
   */
  phoneNumber?: string;
  /**
   * 위도
   * @format double
   * @example 36.3214
   */
  latitude?: number;
  /**
   * 경도
   * @format double
   * @example 127.1724
   */
  longitude?: number;
  /**
   * 윙바디 진입 불가
   * @example "1,2.5,5"
   */
  restrictedWingBody?: string;
  /**
   * 탑차 진입 불가
   * @example "1"
   */
  restrictedBox?: string;
  /**
   * 카고 진입 불가
   * @example "2.5,5"
   */
  restrictedCargo?: string;
  /**
   * 비고
   * @example "윙바디 진입 불가"
   */
  comment?: string;
  /**
   * 작업추가 소요시간
   * @format int32
   * @example 70
   */
  delayTime?: number;
}

export interface CenterRequest {
  /**
   * 사용자 ID
   * @example "C001"
   */
  centerCode?: string;
  /**
   * 센터이름
   * @example "충남정보센터"
   */
  centerName?: string;
  /**
   * 도로명 주소
   * @example "충남 논산시 중앙대로 374번길 41-11"
   */
  roadAddress?: string;
  /**
   * 지번 주소
   * @example "충남 논산시 중앙동 41"
   */
  lotNumberAddress?: string;
  /**
   * 상세주소
   * @example "1층 물류센터"
   */
  detailAddress?: string;
  /**
   * 우편번호
   * @example "32934"
   */
  zipCode?: string;
  /**
   * 담당자명
   * @example "김물류"
   */
  adminName?: string;
  /**
   * 연락처
   * @example "01012345678"
   */
  phoneNumber?: string;
  /**
   * 위도
   * @format double
   * @example 36.3214
   */
  latitude?: number;
  /**
   * 경도
   * @format double
   * @example 127.1724
   */
  longitude?: number;
  /**
   * 윙바디 진입 불가
   * @example "1,2.5,5"
   */
  restrictedWingBody?: string;
  /**
   * 탑차 진입 불가
   * @example "1"
   */
  restrictedBox?: string;
  /**
   * 카고 진입 불가
   * @example "2.5,5"
   */
  restrictedCargo?: string;
  /**
   * 비고
   * @example "윙바디 진입 불가"
   */
  comment?: string;
  /**
   * 작업추가 소요시간
   * @format int32
   * @example 70
   */
  delayTime?: number;
}

/** 배차 취소 요청 정보 */
export interface DispatchCancelRequest {
  /**
   * 배차 번호 id 목록
   * @example [1,2]
   */
  dispatchNumberIds: number[];
}

export interface IssueRequest {
  /**
   * 배송이슈 및 기타사항
   * @example "배송이슈 및 기타사항을 입력합니다. 300자 이내로 입력해주세요. 배송이슈가 발생했습니다."
   */
  issue: string;
}

export interface UpdateDeliveryDestinationRequest {
  /**
   * 윙바디 진입 불가
   * @example "1,2.5,5"
   */
  restrictedWingBody?: string;
  /**
   * 탑차 진입 불가
   * @example "1"
   */
  restrictedBox?: string;
  /**
   * 카고 진입 불가
   * @example "2.5,5"
   */
  restrictedCargo?: string;
  /**
   * 비고
   * @example "윙바디 진입 불가"
   */
  comment?: string;
  /**
   * 작업추가 소요시간
   * @format int32
   * @example 70
   */
  delayTime?: number;
}

export interface UpdateCenterRequest {
  /**
   * 윙바디 진입 불가
   * @example "1,2.5,5"
   */
  restrictedWingBody?: string;
  /**
   * 탑차 진입 불가
   * @example "1"
   */
  restrictedBox?: string;
  /**
   * 카고 진입 불가
   * @example "2.5,5"
   */
  restrictedCargo?: string;
  /**
   * 비고
   * @example "윙바디 진입 불가"
   */
  comment?: string;
  /**
   * 작업추가 소요시간
   * @format int32
   * @example 70
   */
  delayTime?: number;
}

export interface ClientInfo {
  /**
   * 고객명
   * @example "홍길동"
   */
  clientName?: string;
  /**
   * 연락처
   * @example "01012345678"
   */
  phoneNumber?: string;
  /**
   * 도로명 주소
   * @example "충남 논산시 중앙대로 374번길 41-11"
   */
  roadAddress?: string;
  /**
   * 상세주소
   * @example "1층 물류센터"
   */
  detailAddress?: string;
  /**
   * 고객 전달 사항
   * @example "조심히 다뤄주세요."
   */
  note?: string;
}

export interface DestinationInfo {
  /**
   * 담당자명
   * @example "유관순"
   */
  managerName?: string;
  /**
   * 담당자 연락처
   * @example "010-1111-2222"
   */
  phoneNumber?: string;
  /**
   * 배송처 코드
   * @format int64
   * @example 4
   */
  deliveryDestinationCode?: number;
}

export interface TransportOrderResponse {
  /**
   * 배송 유형
   * @example "지입"
   */
  deliveryType?: string;
  /**
   * SM명
   * @example "홍길동"
   */
  smName?: string;
  /**
   * 운송장 번호
   * @example "20240808274985"
   */
  shipmentNumber?: string;
  /**
   * 업체주문번호
   * @example "240812_공동구매"
   */
  orderNumber?: string;
  /**
   * 주문 유형(배송/수거)
   * @example "배송"
   */
  orderType?: string;
  /**
   * 작업희망일
   * @format date
   * @example "2024-08-19"
   */
  requestedWorkDate?: string;
  /**
   * 주문 접수일
   * @format date
   * @example "2024-08-18"
   */
  orderDate?: string;
  /** 휴식 종료 시간 */
  requestedArrivalTime?: LocalTime;
  /** 휴식 종료 시간 */
  estimatedWorkTime?: LocalTime;
  /**
   * 상품명
   * @example "사과"
   */
  productName?: string;
  /**
   * 상품 수량
   * @format int32
   * @example 4
   */
  productCount?: number;
  /**
   * 볼륨
   * @format double
   * @example 80.5
   */
  volume?: number;
  /**
   * 중량
   * @format double
   * @example 80.1
   */
  weight?: number;
  destinationInfo?: DestinationInfo;
  clientInfo?: ClientInfo;
}

export interface DispatchNumberSearchRequest {
  /**
   * 배차 상태
   * @example "WAITING"
   */
  status: "IN_TRANSIT" | "WAITING" | "COMPLETED";
  /**
   * 관리자 여부
   * @example true
   */
  isManager: boolean;
  /**
   * 검색 시작일
   * @format date-time
   */
  startDateTime: string;
  /**
   * 검색 종료일
   * @format date-time
   */
  endDateTime: string;
  /**
   * 검색 옵션
   * @example "driver"
   */
  searchOption?: string;
  /**
   * 검색 키워드
   * @example "john"
   */
  searchKeyword?: string;
}

export interface DispatchNumberSearchResponse {
  /**
   * 진행중
   * @format int32
   * @example 10
   */
  inProgress?: number;
  /**
   * 대기 중
   * @format int32
   * @example 10
   */
  waiting?: number;
  /**
   * 완료
   * @format int32
   * @example 10
   */
  completed?: number;
  /** 검색 결과 목록 */
  results?: DispatchResult[];
}

/** 검색 결과 목록 */
export interface DispatchResult {
  /**
   * 배차id
   * @format int64
   * @example 1
   */
  dispatchNumberId?: number;
  /**
   * 배차 진행률
   * @format int32
   * @example 50
   */
  progress?: number;
  /**
   * 배차 코드
   * @example "DC001"
   */
  dispatchCode?: string;
  /**
   * 배차명
   * @example "Dispatch 1"
   */
  dispatchName?: string;
  /**
   * 배차 시작일시
   * @format date-time
   */
  startDateTime?: string;
  /**
   * 총 주문 수
   * @format int32
   * @example 100
   */
  totalOrder?: number;
  /**
   * SM 수
   * @format int32
   * @example 5
   */
  smNum?: number;
  /**
   * 담당자
   * @example "John Doe"
   */
  manager?: string;
}

export interface DispatchListResponse {
  /**
   * 배차코드
   * @example "240808C001#1"
   */
  dispatchCode?: string;
  /**
   * 배차명
   * @example "서울 배차"
   */
  dispatchName?: string;
  /**
   * 총 진행률
   * @format int32
   * @example 80
   */
  totalProgressionRate?: number;
  /**
   * 총 완료주문수
   * @format int32
   * @example 5
   */
  totalCompletedOrderNum?: number;
  /**
   * 총 주문수
   * @format int32
   * @example 13
   */
  totalOrderNum?: number;
  /**
   * 이슈 주문수
   * @format int32
   * @example 3
   */
  issueOrderNum?: number;
  startStopover?: StartStopover;
  dispatchList?: DispatchSimpleResponse[];
  issueList?: Issue[];
}

export interface DispatchSimpleResponse {
  /**
   * 배차id
   * @format int64
   * @example 2
   */
  dispatchId?: number;
  /**
   * 배차상태(이동 중, 작업완료, 작업대기, 작업시작, 배송지연, 운송 완료, 취소, 휴게 중)
   * @example "작업완료"
   */
  dispatchStatus?: string;
  /**
   * 기사명
   * @example "홍길동"
   */
  smName?: string;
  /**
   * 완료 주문수
   * @format int32
   * @example 3
   */
  completedOrderNum?: number;
  /**
   * 주문수
   * @format int32
   * @example 10
   */
  orderNum?: number;
  /**
   * 진행률
   * @format int32
   * @example 30
   */
  progressionRate?: number;
  /** 경유지 리스트 */
  stopoverList?: Record<string, number>[];
  /** 경로 좌표 리스트 */
  coordinates?: Record<string, number>[];
}

export interface Issue {
  /**
   * 배차코드id
   * @format int64
   * @example 2
   */
  dispatchCodeId?: number;
  /**
   * 배차id
   * @format int64
   * @example 2
   */
  dispatchId?: number;
  /**
   * 기사명
   * @example "홍길동"
   */
  smName?: string;
  /**
   * 주소
   * @example "서울시 강동구 천호동"
   */
  address?: string;
  /**
   * 배송처 id(null이면 배송처정보 없음)
   * @format int64
   * @example 2
   */
  deliveryDestinationId?: number;
  /**
   * 지연된 시간
   * @format int32
   * @example 20
   */
  delayedTime?: number;
}

export interface DispatchDetail {
  /**
   * 배차 상세 ID
   * @format int64
   * @example 1
   */
  dispatchDetailId?: number;
  /**
   * 현재 배송 상태
   * @example "TRANSPORTATION_START"
   */
  dispatchDetailStatus?:
    | "TRANSPORTATION_START"
    | "MOVING"
    | "WORK_COMPLETED"
    | "WORK_WAITING"
    | "WORK_START"
    | "TRANSPORTATION_COMPLETED"
    | "DELIVERY_DELAY"
    | "CANCELED"
    | "RESTING";
  /**
   * 작업 시작 시간
   * @format date-time
   */
  operationStartTime?: string;
  /**
   * 작업 종료 시간
   * @format date-time
   */
  operationEndTime?: string;
  /**
   * 예상 작업 시작 시간
   * @format date-time
   */
  expectationOperationStartTime?: string;
  /**
   * 예상 작업 종료 시간
   * @format date-time
   */
  expectationOperationEndTime?: string;
  /**
   * 예상 이동 시간
   * @format int32
   * @example 30
   */
  ett?: number;
  /**
   * 배송처 타입
   * @example "CENTER"
   */
  destinationType?: "CENTER" | "DELIVERY_DESTINATION" | "CUSTOMER_DESTINATION";
  /**
   * 배송처 ID
   * @format int64
   */
  destinationId?: number;
  /**
   * 배송처 비고
   * @example "Handle with care"
   */
  destinationComment?: string;
  /**
   * 지연 시간
   * @format int32
   * @example 2
   */
  delayedTime?: number;
  /**
   * 지번 주소
   * @example "123 Main St"
   */
  address?: string;
  /**
   * 운송 실행 주문 ID
   * @format int64
   * @example 1001
   */
  transportOrderId?: number;
  /**
   * 위도
   * @format double
   * @example 37.5995
   */
  lat?: number;
  /**
   * 경도
   * @format double
   * @example 127.1116
   */
  lon?: number;
}

export interface DeliveryDestinationResponse {
  /**
   * 배송처 ID
   * @format int64
   * @example 1
   */
  deliveryDestinationId?: number;
  /**
   * 센터 코드
   * @example "C001"
   */
  centerCode?: string;
  /**
   * 센터이름
   * @example "충남정보센터"
   */
  centerName?: string;
  /**
   * 센터 도로명 주소
   * @example "충남 논산시 중앙대로 374번길 41-11"
   */
  centerRoadAddress?: string;
  /**
   * 센터 지번 주소
   * @example "충남 논산시 중앙동 41"
   */
  centerLotNumberAddress?: string;
  /**
   * 배송처 이름
   * @example "충남정보센터"
   */
  destinationName?: string;
  /**
   * 도로명 주소
   * @example "충남 논산시 중앙대로 374번길 41-11"
   */
  roadAddress?: string;
  /**
   * 지번 주소
   * @example "충남 논산시 중앙동 41"
   */
  lotNumberAddress?: string;
  /**
   * 상세주소
   * @example "1층 물류센터"
   */
  detailAddress?: string;
  /**
   * 우편번호
   * @example "32934"
   */
  zipCode?: string;
  /**
   * 담당자명
   * @example "김물류"
   */
  adminName?: string;
  /**
   * 연락처
   * @example "01012345678"
   */
  phoneNumber?: string;
  /**
   * 위도
   * @format double
   * @example 36.3214
   */
  latitude?: number;
  /**
   * 경도
   * @format double
   * @example 127.1724
   */
  longitude?: number;
  /**
   * 윙바디 진입 불가
   * @example "1,2.5,5"
   */
  restrictedWingBody?: string;
  /**
   * 탑차 진입 불가
   * @example "1"
   */
  restrictedBox?: string;
  /**
   * 카고 진입 불가
   * @example "2.5,5"
   */
  restrictedCargo?: string;
  /**
   * 비고
   * @example "윙바디 진입 불가"
   */
  comment?: string;
  /**
   * 작업추가 소요시간
   * @format int32
   * @example 70
   */
  delayTime?: number;
  /**
   * 최종 수정 일시
   * @format date-time
   */
  updateAt?: string;
}

export interface CenterResponse {
  /**
   * 센터 ID
   * @format int64
   * @example 1
   */
  centerId?: number;
  /**
   * 센터 코드
   * @example "C001"
   */
  centerCode?: string;
  /**
   * 센터이름
   * @example "충남정보센터"
   */
  centerName?: string;
  /**
   * 도로명 주소
   * @example "충남 논산시 중앙대로 374번길 41-11"
   */
  roadAddress?: string;
  /**
   * 지번 주소
   * @example "충남 논산시 중앙동 41"
   */
  lotNumberAddress?: string;
  /**
   * 상세주소
   * @example "1층 물류센터"
   */
  detailAddress?: string;
  /**
   * 우편번호
   * @example "32934"
   */
  zipCode?: string;
  /**
   * 담당자명
   * @example "김물류"
   */
  adminName?: string;
  /**
   * 연락처
   * @example "01012345678"
   */
  phoneNumber?: string;
  /**
   * 위도
   * @format double
   * @example 36.3214
   */
  latitude?: number;
  /**
   * 경도
   * @format double
   * @example 127.1724
   */
  longitude?: number;
  /**
   * 윙바디 진입 불가
   * @example "1,2.5,5"
   */
  restrictedWingBody?: string;
  /**
   * 탑차 진입 불가
   * @example "1"
   */
  restrictedBox?: string;
  /**
   * 카고 진입 불가
   * @example "2.5,5"
   */
  restrictedCargo?: string;
  /**
   * 비고
   * @example "윙바디 진입 불가"
   */
  comment?: string;
  /**
   * 작업추가 소요시간
   * @format int32
   * @example 70
   */
  delayTime?: number;
  /**
   * 최종 수정 일시
   * @format date-time
   */
  updateAt?: string;
}

export type UpdateDispatchData = DispatchUpdateResponse;

export type UpdateDispatchError = ErrorResponse;

export type ConfirmDispatchData = any;

export type CancelDispatchData = any;

export type CancelDispatchError = ErrorResponse;

export type RegisterSuperAdminData = any;

export type RegisterDriverData = any;

export type RegisterAdminData = any;

export type LoginData = any;

export type TransportOrderToDispatchData = DispatchResponse;

export type TransportOrderToDispatchError = ErrorResponse;

export type ValidateSmNameAndSmIdsData = SmNameAndSmIdResponse;

export type ValidateSmNameAndSmIdsError = ErrorResponse;

export type AddDeliveryDestinationData = object;

export type AddCenterData = CenterRequest;

export type AddCenterError = ErrorResponse;

export type UpdateIssueData = any;

export type UpdateIssueError = ErrorResponse;

export type CancelDispatchDetailPayload = number[];

export type CancelDispatchDetailData = any;

export type CancelDispatchDetailError = ErrorResponse;

export type GetDeliveryDestinationData = DeliveryDestinationResponse;

export type UpdateDeliveryDestinationData = object;

export type GetCenterData = CenterResponse;

export type GetCenterError = ErrorResponse;

export type UpdateCenterData = object;

export type UpdateCenterError = CenterRequest | ErrorResponse;

export type WithdrawData = any;

export type LogoutData = any;

export type GetTransportOrderByIdData = TransportOrderResponse;

export type GetTransportOrderByIdError = ErrorResponse;

export type DownloadOrderFormExcelData = any;

export interface SearchDispatchesParams {
  /** 배차 검색 요청 정보 */
  request: DispatchNumberSearchRequest;
}

export type SearchDispatchesData = DispatchNumberSearchResponse;

export type SearchDispatchesError = ErrorResponse;

export type GetDispatchListData = DispatchListResponse;

export type GetDispatchListError = ErrorResponse;

export type GetDispatchDetailData = DispatchDetailResponse;

export type GetDispatchDetailError = ErrorResponse;
