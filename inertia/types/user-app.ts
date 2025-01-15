import { SuccessResponse } from '#sharedTypes/server-response'
import { WebhookUrl } from './webhook'

export type UserApp = {
  id: string
  name: string
  secret: string | null
  userId: string
  createdAt: string
  updatedAt: string
  webhookUrls: WebhookUrl[]
}

export type CreateAppResponse = SuccessResponse<UserApp>
