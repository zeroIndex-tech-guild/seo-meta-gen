import { MetaQueue } from '#queue/metagen-queue'
import { createMetaGenValidator } from '#validators/meta-gen'
import { inject } from '@adonisjs/core'
import { HttpContext, ResponseStatus } from '@adonisjs/core/http'

@inject()
export default class metaGenController {
  constructor(protected metagenQueue: MetaQueue) {}

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
}
