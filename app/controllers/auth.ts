import { AuthService } from '#services/auth'
import { loginValidator, signUpValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext, ResponseStatus } from '@adonisjs/core/http'

@inject()
export default class LoginController {
  constructor(protected authService: AuthService) {}

  async renderLoginPage({ inertia }: HttpContext) {
    return inertia.render('auth/login/index')
  }

  async renderSignupPage({ inertia }: HttpContext) {
    //return inertia.render('auth/signup')
  }

  async login({ request, response }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const { error, data } = await this.authService.login(email, password)

    if (error) {
      return response.unauthorized(error)
    }

    return {
      messag: 'User logged in successfully.',
      statusCode: ResponseStatus.Ok,
      data,
      error: null,
    }
  }

  async signup({ request, response }: HttpContext) {
    const userFormData = await request.validateUsing(signUpValidator)

    const { error, data } = await this.authService.signup(userFormData)

    if (error) {
      return response.status(ResponseStatus.BadRequest).send({
        statusCode: ResponseStatus.BadRequest,
        message: 'Error while signing up',
        data: null,
        error,
      })
    }

    return {
      statusCode: ResponseStatus.Ok,
      messag: 'Signed up successfully.',
      data,
      error: null,
    }
  }
}
