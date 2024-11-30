import User from '#models/user'
import { inject } from '@adonisjs/core'
import { ServiceResponse } from '../types/meta-response.js'
import { AccessToken } from '@adonisjs/auth/access_tokens'
import { SignUpValues } from '#validators/auth'

@inject()
export class AuthService {
  async login(
    email: string,
    password: string
  ): Promise<ServiceResponse<{ accessToken: AccessToken }>> {
    const user = await User.verifyCredentials(email, password)

    if (!user) {
      return {
        data: null,
        error: 'Invalid credentials',
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

  async signup(data: SignUpValues): Promise<ServiceResponse<User>> {
    try {
      const user = await User.create(data)
      return {
        data: user,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: error.message,
      }
    }
  }
}
