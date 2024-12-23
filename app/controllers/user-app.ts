import UserAppService from '#services/user-app'
import { createNewAppValidator, generateSecretKeyValidator } from '#validators/webhook-app'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import { StatusCodes } from 'http-status-codes'

@inject()
export default class UserAppController {
  constructor(protected userAppService: UserAppService) {}

  async renderCreateAppPage({ inertia, request, auth }: HttpContext) {
    const user = auth.user!

    const {
      params: { appId },
    } = await request.validateUsing(generateSecretKeyValidator)
    const { data } = await this.userAppService.getUserApp({ userId: user.id, appId })

    return inertia.render('webhook/subpages/create-app/index', {
      appId,
      app: data,
    })
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

  async generateAppSecretKey({ request, auth, response }: HttpContext) {
    const {
      params: { appId },
    } = await request.validateUsing(generateSecretKeyValidator)
    const user = auth.user!

    const { data, error } = await this.userAppService.generateUserAppSecretKey({
      userId: user.id,
      appId,
    })

    if (error) {
      return response.badRequest(error)
    }

    return {
      data,
      error: null,
      status: StatusCodes.OK,
      message: 'Secret key generated successfully',
    }
  }
}
