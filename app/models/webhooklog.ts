import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Webhooklog extends BaseModel {
  @column({ isPrimary: true })
  declare id: string

  @column()
  declare url: string

  @column()
  declare status: 'success' | 'failed'

  @column()
  declare userId: number

  @column()
  declare metaId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
