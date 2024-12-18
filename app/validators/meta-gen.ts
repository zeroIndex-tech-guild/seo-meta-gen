import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createMetaGenValidator = vine.compile(
  vine.object({
    content: vine.string(),
  })
)

export type CreateMetaGenValues = Infer<typeof createMetaGenValidator>

export const createMetaGenValidatorForAPI = vine.compile(
  vine.object({
    content: vine.string(),

    headers: vine.object({
      'x-secret-key': vine.string(),
    }),
  })
)
