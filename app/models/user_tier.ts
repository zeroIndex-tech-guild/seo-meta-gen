import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { USER_TIER_STATUS } from '#sharedTypes/enums/index'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Tier from './tier.js'

export default class UserTier extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare userId: number

  @column()
  declare tierId: number

  @column()
  declare startDate: DateTime

  @column()
  declare endDate: DateTime

  @column()
  declare status: USER_TIER_STATUS

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Tier)
  declare tier: BelongsTo<typeof Tier>

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
