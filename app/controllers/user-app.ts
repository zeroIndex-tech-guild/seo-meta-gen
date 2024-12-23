import UserAppService from '#services/user-app'
import { createNewAppValidator } from '#validators/webhook-app'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'

@inject()
export default class UserAppController {
  constructor(protected userAppService: UserAppService) {}

  async renderCreateAppPage({ inertia }: HttpContext) {
    return inertia.render('webhook/subpages/create-app/index')
  }

  async createUserApp({ request, response, auth }: HttpContext) {
    const { name } = await request.validateUsing(createNewAppValidator)
    const userId = auth.user!.id

    const { data, error } = await this.userAppService.createUserApp({ userId, name })

    if (error) {
      return response.badRequest(error)
    }

    return {
      data,
      error: null,
      status: StatusCodes.OK,
      message: 'App created successfully',
    }
  }
}
