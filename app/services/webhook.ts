import User from '#models/user'
import WebhookSecret from '#models/webhook-secret'
import WebhookUrl from '#models/webhook-urls'
import crypto from 'node:crypto'

export default class WebhookService {
  async generateSecretKey(user?: User) {
    const secretKey = crypto.randomBytes(32).toString('hex')

    if (!user) {
      return {
        data: {
          secretKey: secretKey,
        },
        error: null,
      }
    }

    // Inactivate the old secret key if it exists
    const existingSecret = await WebhookSecret.query().where('user_id', user.id).first()
    if (existingSecret) {
      existingSecret.isActive = false
      await existingSecret.save()
    }

    await WebhookSecret.create({
      userId: user.id,
      secretKey: secretKey,
      isActive: true,
    })

    return {
      data: {
        secretKey: secretKey,
      },
      error: null,
    }
  }

  async addWebhookUrl(userId: number, url: string) {
    const existingUrl = await WebhookUrl.query()
      .where('user_id', userId)
      .where('is_active', true)
      .first()

    if (existingUrl) {
      existingUrl.isActive = false
      await existingUrl.save()
    }

    const newUrl = await WebhookUrl.create({
      userId,
      url,
    })

    return {
      data: newUrl,
      error: null,
    }
  }

  async getCurrentWebhookUrl(userId: number) {
    const currentWebhook = await WebhookUrl.query()
      .where('user_id', userId)
      .where('is_active', true)
      .first()

    return {
      data: currentWebhook,
      error: null,
    }
  }

  async getCurrentSecretKey(userId: number) {
    const currentSecret = await WebhookSecret.query()
      .where('user_id', userId)
      .where('is_active', true)
      .first()

    return {
      data: currentSecret,
      error: null,
    }
  }
}
