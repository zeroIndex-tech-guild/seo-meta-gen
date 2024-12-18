import { MetaQueue } from '#queue/metagen-queue'
import { createMetaGenValidator, createMetaGenValidatorForAPI } from '#validators/meta-gen'
import { inject } from '@adonisjs/core'
import { HttpContext, ResponseStatus } from '@adonisjs/core/http'

@inject()
export default class metaGenController {
  constructor(protected metagenQueue: MetaQueue) {}

  async renderMetagenPage({ inertia }: HttpContext) {
    return inertia.render('dashboard/metagen/index')
  }

  async generateTag({ request, response }: HttpContext) {
    const { content } = await request.validateUsing(createMetaGenValidator)

    const { data, error } = await this.metagenQueue.addJob({ content })

    if (error !== null) {
      return response.status(ResponseStatus.BadRequest).send({
        data: null,
        message: error.message,
        error,
        stausCode: ResponseStatus.BadRequest,
      })
    }

    return {
      data,
      error: null,
      statusCode: ResponseStatus.Ok,
      message: "Tag's generation was queued successfully",
    }
  }

  async generateTagForAPI({ request, response }: HttpContext) {
    const {
      content,
      headers: { 'x-secret-key': secret },
    } = await request.validateUsing(createMetaGenValidatorForAPI)

    const { data, error } = await this.metagenQueue.addJob({
      content,
      webhook: {
        trigger: true,
        secret,
      },
    })

    if (error !== null) {
      return response.status(ResponseStatus.BadRequest).send({
        data: null,
        message: error.message,
        error,
        stausCode: ResponseStatus.BadRequest,
      })
    }

    return {
      data,
      error: null,
      statusCode: ResponseStatus.Ok,
      message: "Tag's generation was queued successfully",
    }
  }
}
