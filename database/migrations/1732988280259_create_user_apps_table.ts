import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_apps'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()

      table.string('name').notNullable()

      table.string('secret').defaultTo(null)

      table.string('user_id').unsigned().references('users.id').onDelete('CASCADE')

      table.timestamp('created_at')

      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
