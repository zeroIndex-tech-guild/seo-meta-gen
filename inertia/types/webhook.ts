import { ServerResponse, SuccessResponse } from '#sharedTypes/server-response'

export type WebhookUrl = {
  id: string

  url: string

  environment: 'dev' | 'prod'

  userAppId: string

  createdAt: string

  updatedAt: string
}

export type GenerateSecretKeyResponse = SuccessResponse<{
  secretKey: string
}>

export type AddWebhookUrlResponse = SuccessResponse<WebhookUrl>

export type GetCurrentWebhookUrlResponse = ServerResponse<WebhookUrl>

export type GetCurrentSecretKeyResponse = ServerResponse<{
  secretKey: string
}>
