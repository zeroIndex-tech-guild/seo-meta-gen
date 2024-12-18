import crypto from 'crypto'

export function generateSecretKey(): string {
  return crypto.randomBytes(32).toString('hex') // Generates a 32-byte key and converts it to hex
}
