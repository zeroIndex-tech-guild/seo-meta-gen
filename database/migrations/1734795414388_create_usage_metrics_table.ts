import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'usage_metrics'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()

      table.string('user_id').unsigned().references('users.id').onDelete('CASCADE')

      table.string('user_tier_id').unsigned().references('user_tiers.id').onDelete('CASCADE')

      table.integer('usage_count').defaultTo(0)

      table.timestamp('created_at')

      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
