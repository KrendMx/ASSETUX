export type PendingRequest = {
  state: 'pending'
}

export type SuccessfulRequest<T> = {
  state: 'success'
  result: T
}

export type ErrorRequest<T> = {
  state: 'error'
  error: T
}

export type RequestState<S = unknown, E = unknown> =
  | PendingRequest
  | SuccessfulRequest<S>
  | ErrorRequest<E>

export type SuccessfulResponse<T> = {
  state: 'success'
  status: number
  message: string
  data: T
}

export type ErrorResponse<T> = {
  state: 'error'
  status: number
  message: string
  data: T
}

export type CancelledResponse = {
  state: 'cancelled'
}

export type UnavailableResponse = {
  state: 'unavailable'
}

export type Response<S = unknown, E = unknown> =
  | SuccessfulResponse<S>
  | ErrorResponse<E>
  | CancelledResponse
  | UnavailableResponse

export type UrlRequest = {
  apiHost: string
}

export type Abortable = {
  signal?: AbortSignal
}

export enum PayProviders {
  VISAMASTER = 'VISAMASTER',
  QIWI = 'QIWI'
}

export const { VISAMASTER, QIWI } = PayProviders
