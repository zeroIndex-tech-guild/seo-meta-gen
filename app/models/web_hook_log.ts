import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import MetaTag from './meta_tag.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { STATUS } from '#sharedTypes/enums/index'

export default class WebHookLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare url: string

  @column()
  declare payload: JSON

  @column()
  declare response: JSON

  @column()
  declare attemptCount: number

  @column()
  declare error: JSON

  @column()
  declare status: STATUS

  @column()
  declare metaTagId: number

  @belongsTo(() => MetaTag)
  declare metaTag: BelongsTo<typeof MetaTag>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
