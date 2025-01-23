import UserApp from '#models/user_app'
import { createMetaGenValidatorForAPI } from '#validators/meta-gen'
import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

export default class WebhookApiAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    /**
     * Middleware logic goes here (before the next call)
     */

    const {
      headers: { 'x-secret-key': secretKey },
    } = await ctx.request.validateUsing(createMetaGenValidatorForAPI)

    const user = await UserApp.query().where('secret', secretKey).preload('user').first()

    if (!user) {
      return ctx.response.unauthorized()
    }

    /**
     * Call next method in the pipeline and return its output
     */
    const output = await next()
    return output
  }
}
