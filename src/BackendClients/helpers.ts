import axios from "axios"
import config from "../utils/config"

import type { AxiosRequestConfig } from "axios"
import type { Response } from "./types"

export const handleRequest = async (
  props: AxiosRequestConfig
): Promise<Response<any, any>> => {
  try {
    const response = await axios(props)

    return {
      state: "success",
      status: response.status,
      message: response.statusText,
      data: response.data
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const response = error.response

      return {
        state: "error",
        status: response.status,
        message: response.statusText,
        data: response.data
      }
    } else {
      if (axios.isCancel(error)) {
        return {
          state: "cancelled"
        }
      }

      return {
        state: "unavailable"
      }
    }
  }
}

export const constructURL = (apiHost: string) => {
  return `${config.hostProtocol}://${apiHost}`
}
