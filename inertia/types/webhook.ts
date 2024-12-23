import { ServerResponse, SuccessResponse } from '#sharedTypes/server-response'

type WebhookUrl = {
  id: string

  userId: string

  url: string

  createdAt: string

  updatedAt: string
}

export type GenerateSecretKeyResponse = SuccessResponse<{
  secretKey: string
}>

export type AddWebhookUrlResponse = ServerResponse<WebhookUrl>

export type GetCurrentWebhookUrlResponse = ServerResponse<WebhookUrl>

export type GetCurrentSecretKeyResponse = ServerResponse<{
  secretKey: string
}>
