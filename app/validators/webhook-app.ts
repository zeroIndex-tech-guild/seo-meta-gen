import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const createNewAppValidator = vine.compile(
  vine.object({
    name: vine.string(),
  })
)

export type CreateNewAppValues = Infer<typeof createNewAppValidator>
