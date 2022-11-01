import axios, { AxiosError, AxiosResponse } from 'axios'
import type { Response } from './types.core.backend'
import Cookies from 'js-cookie'
import { genericURL } from '@/lib/data/constants'
import https from 'https'

export const devHandleSuccessRequest = (
  data: any
): Promise<Response<any, any>> => {
  return Promise.resolve({
    state: 'success',
    status: 200,
    message: 'dev success',
    data
  })
}

export const api = axios.create({
  baseURL: genericURL,
  httpsAgent: new https.Agent({
    rejectUnauthorized: false
  })
})

api.interceptors.request.use(
  async (config) => {
    const locale = Cookies.get('NEXT_LOCALE') || 'ru'
    return {
      ...config,
      headers: {
        ...config.headers,
        Accept: 'application/json',
        'Content-Type': 'application/json',
        locale
      }
    }
  },
  async (error) => {
    return {
      state: 'error',
      status: 400,
      message: 'Request error',
      data: error
    }
  }
)

export const formatAPIResponse = async (response: AxiosResponse) => {
  if (
    (response?.data as Object).hasOwnProperty('success') &&
    !response?.data?.success
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
}

api.interceptors.response.use(
  formatAPIResponse,
  async (error: AxiosError | Error) => {
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
)

// UNUSED

// const handleRequest = async (
//   props: AxiosRequestConfig
// ): Promise<Response<any, any>> => {
//   try {
//     const locale = Cookies.get('NEXT_LOCALE') || 'ru'
//     const response = await axios({
//       ...props,
//       headers: {
//         ...props.headers,
//         locale
//       }
//     })

//     if (
//       (response?.data as Object).hasOwnProperty('success') &&
//       !response.data.success
//     ) {
//       throw {
//         status: 404,
//         statusText: 'Not success from backend',
//         data: null
//       }
//     }

//     return {
//       state: 'success',
//       status: response.status,
//       message: response.statusText,
//       data: (response?.data as Object).hasOwnProperty('success')
//         ? response.data.data
//         : response.data
//     }
//   } catch (error) {
//     if (axios.isAxiosError(error) && error.response) {
//       const response = error.response

//       return {
//         state: 'error',
//         status: response.status,
//         message: response.statusText,
//         data: response.data
//       }
//     } else {
//       if (axios.isCancel(error)) {
//         return {
//           state: 'cancelled'
//         }
//       }

//       return {
//         state: 'unavailable'
//       }
//     }
//   }
// }

// export default handleRequest
