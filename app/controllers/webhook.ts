import WebhookService from '#services/webhook'
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

  async verifyWebhookSignature(userId: number, payload: string, receivedSignature: string) {
    //// Retrieve the stored secret key for the user
    //const webhookConfig = await Webhook.query().where('userId', userId).first()
    //
    //if (!webhookConfig) {
    //  throw new Error('Webhook not found for the user')
    //}
    //
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
