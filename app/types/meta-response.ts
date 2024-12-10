export type SuccessSerivceResonse<T> = {
  statusCode: number
  message: string
  data: T
  error: null
}

export type ErrorServiceResponse = {
  data: null
  error: string
  messag: string
}

export type ServiceResponse<T> = SuccessSerivceResonse<T> | ErrorServiceResponse
