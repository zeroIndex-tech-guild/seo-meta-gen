import UserApp from '#models/user_app'
import { getID } from '#utils'
import { inject } from '@adonisjs/core'
import HmacService from './hmac.js'

@inject()
export default class UserAppService {
  constructor(protected hmacService: HmacService) {}

  async createUserApp({ userId, name }: { userId: string; name: string }) {
    try {
      const userApp = await UserApp.create({
        id: getID(),
        userId,
        name,
      })

      return {
        data: userApp,
        error: null,
      }
    } catch (e) {
      return {
        data: null,
        error: e as Error,
      }
    }
  }

  async getUserApp({ userId, appId }: { userId: string; appId: string }) {
    try {
      const userApp = await UserApp.query().where({ userId, id: appId }).first()

      return {
        data: userApp,
        error: null,
      }
    } catch (e) {
      return {
        data: null,
        error: e as Error,
      }
    }
  }

  async generateUserAppSecretKey({ appId }: { userId: string; appId: string }) {
    try {
      const secretKey = this.hmacService.generateSecretKey()
      const userApp = await UserApp.query().where({ id: appId }).first()

      userApp!.secret = secretKey
      await userApp?.save()

      return {
        data: {
          secretKey,
          userApp,
        },
        error: null,
      }
    } catch (e) {
      return {
        data: null,
        error: e as Error,
      }
    }
  }
}
