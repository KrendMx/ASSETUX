import axios from 'axios'

import type { AxiosRequestConfig } from 'axios'
import type { Response } from './types'
import Cookies from 'js-cookie'
const handleRequest = async (
  props: AxiosRequestConfig
): Promise<Response<any, any>> => {
  try {
    const locale = Cookies.get('NEXT_LOCALE') || 'ru'
    const response = await axios({
      ...props,
      headers: {
        ...props.headers,
        locale
      }
    })

    if (
      (response?.data as Object).hasOwnProperty('success') &&
      !response.data.success
    ) {
      throw {
        status: 404,
        statusText: 'Not success from backend',
        data: null
      }
    }

    return {
      state: 'success',
      status: response.status,
      message: response.statusText,
      data: (response?.data as Object).hasOwnProperty('success')
        ? response.data.data
        : response.data
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const response = error.response

      return {
        state: 'error',
        status: response.status,
        message: response.statusText,
        data: response.data
      }
    } else {
      if (axios.isCancel(error)) {
        return {
          state: 'cancelled'
        }
      }

      return {
        state: 'unavailable'
      }
    }
  }
}

export default handleRequest
