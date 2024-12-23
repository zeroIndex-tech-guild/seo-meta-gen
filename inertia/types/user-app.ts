import { SuccessResponse } from '#sharedTypes/server-response'

export type UserApp = {
  id: string
  name: string
  secret: string | null
  userId: string
  createdAt: string
  updatedAt: string
}

export type CreateAppResponse = SuccessResponse<UserApp>
