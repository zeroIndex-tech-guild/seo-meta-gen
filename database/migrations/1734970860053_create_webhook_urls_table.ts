import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'webhook_urls'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').primary()

      table.string('url', 2048).notNullable()

      table.enum('environment', ['dev', 'prod']).notNullable()

      table
        .string('user_app_id')
        .unsigned()
        .references('user_apps.id')
        .onDelete('CASCADE')
        .notNullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
