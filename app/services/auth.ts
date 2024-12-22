import User from '#models/user'
import { inject } from '@adonisjs/core'
import { SignUpValues } from '#validators/auth'
import { getID } from '../utils/index.js'

@inject()
export class AuthService {
  async login(email: string, password: string) {
    console.log({ email, password })
    const user = await User.verifyCredentials(email, password)

    const accessToken = await User.accessTokens.create(user, ['*'], {
      expiresIn: '30 days',
    })

    return {
      data: { accessToken, user },

      error: null,
    }
  }

  async signup(data: SignUpValues) {
    try {
      const user = await User.create({
        ...data,
        id: getID(),
      })
      return {
        data: user,
        error: null,
      }
    } catch (error) {
      if (error.code === '23505' && error.constraint === 'users_email_unique') {
        return {
          data: null,
          error: [
            {
              code: 'EMAIL_ALREADY_EXISTS',
              message: 'User with email already exists.',
            },
          ],
        }
      }
      return {
        data: null,
        error,
      }
    }
  }
}
