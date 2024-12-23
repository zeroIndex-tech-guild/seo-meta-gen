import UserApp from '#models/user_app'
import { getID } from '#utils'

export default class UserAppService {
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
}
