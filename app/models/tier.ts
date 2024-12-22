import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import UserTier from './user_tier.js'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Tier extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare name: string

  @column()
  declare price: number

  @column()
  declare limit: number

  @hasMany(() => UserTier)
  declare userTiers: HasMany<typeof UserTier>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
