import User from '#models/user'
import WebhookSecret from '#models/webhook-secret'
import crypto from 'node:crypto'

export default class WebhookService {
  async generateSecretKey(user?: User) {
    const secretKey = crypto.randomBytes(32).toString('hex') // Generates a 32-byte key and converts it to hex

    if (!user) {
      return {
        data: {
          secretKey: secretKey,
        },
        error: null,
      }
    }

    await WebhookSecret.create({
      userId: user.id,
      secretKey: secretKey,
    })

    return {
      data: {
        secretKey: secretKey,
      },
      error: null,
    }
  }
}
