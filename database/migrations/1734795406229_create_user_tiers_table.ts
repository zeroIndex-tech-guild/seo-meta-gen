import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_tiers'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()

      table.string('user_id').unsigned().references('users.id').onDelete('CASCADE')

      table.string('tier_id').unsigned().references('tiers.id').onDelete('CASCADE')

      table.timestamp('start_date')

      table.timestamp('end_date')

      table.enum('status', ['active', 'expired', 'cancelled']).defaultTo('active')

      table.timestamp('created_at')

      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
