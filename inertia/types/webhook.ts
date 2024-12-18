import { ServerResponse } from '#sharedtypes'

export type GenerateSecretKeyResponse = ServerResponse<{
  secretKey: string
}>
