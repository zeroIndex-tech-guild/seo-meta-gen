import MetaGen from '#services/meta-gen'
import { createMetaGenValidator } from '#validators/meta-gen'
import { inject } from '@adonisjs/core'
import { HttpContext, ResponseStatus } from '@adonisjs/core/http'

@inject()
export default class metaGenController {
  constructor(protected metaGen: MetaGen) {}

  async generateTag({ request, response }: HttpContext) {
    const { content } = await request.validateUsing(createMetaGenValidator)

    const { data, error } = await this.metaGen.generateTag({ content })

    if (error) {
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
      message: "Tag's generated successfully",
    }
  }
}
