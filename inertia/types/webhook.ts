import { ServerResponse } from '#sharedTypes/server-response'

type WebhookUrl = {
  id: string

  userId: string

  url: string

  createdAt: string

  updatedAt: string
}

export type GenerateSecretKeyResponse = ServerResponse<{
  secretKey: string
}>

export type AddWebhookUrlResponse = ServerResponse<WebhookUrl>

export type GetCurrentWebhookUrlResponse = ServerResponse<WebhookUrl>
