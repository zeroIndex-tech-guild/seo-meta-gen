import crypto from 'node:crypto'

export default class HmacService {
  generateHmacKey(secret: string, payload: unknown) {
    const secretKey = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex')
    return secretKey
  }

  generateSecretKey() {
    const secretKey = crypto.randomBytes(32).toString('hex')
    return secretKey
  }

  verifyHmacKey(hmacKey: string, secret: string, payload: unknown) {
    const secretKey = crypto
      .createHmac('sha256', secret)
      .update(JSON.stringify(payload))
      .digest('hex')
    return secretKey === hmacKey
  }
}
