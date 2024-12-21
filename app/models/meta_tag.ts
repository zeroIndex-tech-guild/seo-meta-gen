import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'

import { DateTime } from 'luxon'
import UserApp from './user_app.js'
import { GENERATED_FOR } from '#sharedTypes/enums/index'
import WebHookLog from './web_hook_log.js'

export default class MetaTag extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare tags: JSON

  @column()
  declare generatedFor: GENERATED_FOR

  @column()
  declare appId: string

  @column()
  declare userId: string

  @belongsTo(() => UserApp)
  declare userApp: BelongsTo<typeof UserApp>

  @hasMany(() => WebHookLog)
  declare webHookLogs: HasMany<typeof WebHookLog>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
