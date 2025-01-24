import { AuthService } from '#services/auth'
import { loginValidator, signUpValidator } from '#validators/auth'
import { inject } from '@adonisjs/core'
import { HttpContext, ResponseStatus } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'
@inject()
export default class LoginController {
  constructor(protected authService: AuthService) {}

  async renderLoginPage({ inertia }: HttpContext) {
    return inertia.render('auth/login/index', {
      title: 'Metagen - Login',
      description: 'Login to Metagen',
    })
  }

  async renderSignupPage({ inertia }: HttpContext) {
    return inertia.render(
      'auth/signup/index',
      {},
      {
        title: 'Metagen - Signup',
        description: 'Signup to Metagen',
      }
    )
  }

  async login({ request, response, auth }: HttpContext) {
    const { email, password } = await request.validateUsing(loginValidator)

    const { error, data } = await this.authService.login(email, password)

    if (error) {
      return response.status(StatusCodes.UNAUTHORIZED).send({
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Invalid credentials.',
        data: null,
        error,
      })
    }

    await auth.use('web').login(data.user)

    return {
      message: 'User logged in successfully.',
      statusCode: ResponseStatus.Ok,
      data,
      error: null,
    }
  }

  async signup({ request, response }: HttpContext) {
    const userFormData = await request.validateUsing(signUpValidator)

    const { error, data } = await this.authService.signup(userFormData)

    if (error) {
      const hasMultipleErrors = error.length > 1
      const message = !hasMultipleErrors ? error[0].message : 'Error while signing up.'

      return response.status(ResponseStatus.BadRequest).send({
        statusCode: ResponseStatus.BadRequest,
        message,
        data: null,
        error,
      })
    }
    return {
      statusCode: ResponseStatus.Ok,
      message: 'Signed up successfully.',
      data,
      error: null,
    }
  }
}
