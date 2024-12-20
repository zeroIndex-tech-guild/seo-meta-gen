import WebhookService from '#services/webhook'
import { addWebhookUrlValidator } from '#validators/webhook'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export default class WebhookController {
  constructor(protected webHookService: WebhookService) {}
  renderWebhookPage({ inertia }: HttpContext) {
    return inertia.render('webhook/index')
  }

  async index() {
    return {
      data: {
        token: process.env.WEBHOOK_TOKEN,
      },
      error: null,
    }
  }

  async generateSecretKey({ auth }: HttpContext) {
    const user = auth.user

    const { data } = await this.webHookService.generateSecretKey(user)

    return {
      statusCode: 200,
      message: 'Secret key generated successfully',
      data,
      error: null,
    }
  }

  async addWebhookUrl({ auth, request }: HttpContext) {
    const user = auth.user!
    const { url } = await request.validateUsing(addWebhookUrlValidator)

    const { data } = await this.webHookService.addWebhookUrl(user.id, url)

    return {
      statusCode: 200,
      message: 'Webhook URL added successfully',
      data,
      error: null,
    }
  }

  async getCurrentWebhookUrl({ auth }: HttpContext) {
    const user = auth.user!

    const { data } = await this.webHookService.getCurrentWebhookUrl(user.id)

    return {
      statusCode: 200,
      message: 'Webhook URL retrieved successfully',
      data,
      error: null,
    }
  }

  async getCurrentSecretKey({ auth }: HttpContext) {
    const userId = auth.user!.id

    const { data } = await this.webHookService.getCurrentSecretKey(userId)

    return {
      statusCode: 200,
      message: 'Secret key retrieved successfully',
      data,
      error: null,
    }
  }

  async verifyWebhookSignature(userId: number, payload: string, receivedSignature: string) {
    //// Retrieve the stored secret key for the user
    //const webhookConfig = await Webhook.query().where('userId', userId).first()
    //
    //if (!webhookConfig) {
    //  throw new Error('Webhook not found for the user')
    //}
    //}
    //// Verify the received signature
    //const computedSignature = generateSignature(payload, webhookConfig.secretKey)
    //
    //if (computedSignature !== receivedSignature) {
    //  throw new Error('Invalid signature')
    //}
    //
    //// Proceed with processing the webhook
    //return true
  }
}
