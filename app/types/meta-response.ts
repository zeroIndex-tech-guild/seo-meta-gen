export type SuccessSerivceResonse<T> = {
  data: T
  error: null
}

export type ErrorServiceResponse = {
  data: null
  error: string
}

export type ServiceResponse<T> = SuccessSerivceResonse<T> | ErrorServiceResponse
