import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const addWebhookUrlValidator = vine.compile(
  vine.object({
    url: vine.string(),
  })
)

export type AddWebhookUrlValidator = Infer<typeof addWebhookUrlValidator>
