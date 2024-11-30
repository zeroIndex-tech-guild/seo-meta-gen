import vine from '@vinejs/vine'
import { Infer } from '@vinejs/vine/types'

export const loginValidator = vine.compile(
  vine.object({
    email: vine.string().email(),
    password: vine.string(),
  })
)

export type LoginValues = Infer<typeof loginValidator>

export const signUpValidator = vine.compile(
  vine.object({
    fullName: vine.string(),
    email: vine.string().email(),
    password: vine.string(),
  })
)

export type SignUpValues = Infer<typeof signUpValidator>
