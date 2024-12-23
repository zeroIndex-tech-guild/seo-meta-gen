import { ServerResponse, SuccessResponse } from '#sharedTypes/server-response'

export type CreateAppResponse = SuccessResponse<{
  id: string
  name: string
  secret: string | null
  userId: string
  createdAt: string
  updatedAt: string
}>
