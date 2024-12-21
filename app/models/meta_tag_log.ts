import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import MetaTag from './meta_tag.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import { STATUS } from '#sharedTypes/enums/index'

export default class MetaTagLog extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare jobId: string

  @column()
  declare metaTagId: string

  @column()
  declare status: STATUS

  @belongsTo(() => MetaTag)
  declare metaTag: BelongsTo<typeof MetaTag>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
