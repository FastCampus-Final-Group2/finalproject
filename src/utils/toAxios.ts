import _axios, { AxiosError, AxiosResponse } from "axios";

export type Error =
  | {
      type: "AXIOS_ERROR";
      status?: number;
      statusText?: string;
      data?: AxiosError["response"];
    }
  | {
      type: "UNKNOWN_ERROR";
      data: null;
    };

type AxiosResult<T> = [null, T] | [Error, null];

const toAxios = async <T>(axiosRequest: Promise<AxiosResponse<T>>): Promise<AxiosResult<T>> => {
  try {
    const response = await axiosRequest;

    return [null, response.data];
  } catch (error) {
    if (_axios.isAxiosError(error)) {
      return [
        {
          type: "AXIOS_ERROR",
          status: error.response?.status,
          statusText: error.response?.statusText,
          data: error.response?.data,
        },
        null,
      ];
    }

    return [
      {
        type: "UNKNOWN_ERROR",
        data: null,
      },
      null,
    ];
  }
};

export default toAxios;
