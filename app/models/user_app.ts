import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import MetaTag from './meta_tag.js'
import WebhookUrl from './webhook_url.js'

export default class UserApp extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare secret: string

  @column()
  declare userId: string

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @hasMany(() => MetaTag)
  declare metaTags: HasMany<typeof MetaTag>

  @hasMany(() => WebhookUrl)
  declare webhookUrls: HasMany<typeof WebhookUrl>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
