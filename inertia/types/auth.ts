import { ServerResponse, SuccessResponse } from '#sharedTypes/server-response'

export type LoginFormValues = {
  email: string
  password: string
}

export type AccessToken = {
  type: string
  name: string | null
  token: string
  abilities: string[]
  lastUsedAt: string | null
  expiresAt: string
}

export type User = {
  id: string
}

export type SignupFormValues = {
  fullName: string
  email: string
  password: string
  confirmPassword: string
}

export type LoginResponse = SuccessResponse<{
  accessToken: AccessToken
  user: User
}>

export type SignupResponse = ServerResponse<{
  id: string
  fullName: string
  email: string
  createdAt: Date
  updatedAt: Date
}>
