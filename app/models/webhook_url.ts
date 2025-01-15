import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import UserApp from './user_app.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class WebhookUrl extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare url: string

  @column()
  declare environment: 'dev' | 'prod'

  @column()
  declare userAppId: string

  @belongsTo(() => UserApp)
  declare userApp: BelongsTo<typeof UserApp>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
