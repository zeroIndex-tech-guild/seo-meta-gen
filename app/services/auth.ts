import User from '#models/user'
import { inject } from '@adonisjs/core'
import { SignUpValues } from '#validators/auth'

@inject()
export class AuthService {
  async login(email: string, password: string) {
    const user = await User.verifyCredentials(email, password)

    if (!user) {
      return {
        data: null,
        error: [
          {
            code: 'INVALID_CREDENTIALS',
            message: 'Invalid credentials',
          },
        ],
      }
    }

    const accessToken = await User.accessTokens.create(user, ['*'], {
      expiresIn: '30 days',
    })

    return {
      data: { accessToken },
      error: null,
    }
  }

  async signup(data: SignUpValues) {
    try {
      const user = await User.create(data)
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
