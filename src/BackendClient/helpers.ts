import axios from "axios"
import config from "../config"
import type { AxiosRequestConfig } from "axios"

type ResponseType = {
  status?: number
  message: string
  data?: any
}

export const handleRequest = async (
  props: AxiosRequestConfig
): Promise<ResponseType> => {
  try {
    const response = await axios({ ...props })
    return {
      status: response.status,
      message: response.statusText,
      data: response.data
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const response = error.response

      return {
        status: response.status,
        message: response.statusText,
        data: response.data
      }
    } else {
      return {
        message: "Server is unavailable"
      }
    }
  }
}

export const constructURL = (apiHost: string) => {
  return `${config.hostProtocol}://${apiHost}`
}
