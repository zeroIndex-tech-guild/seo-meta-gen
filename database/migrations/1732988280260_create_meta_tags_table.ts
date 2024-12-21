import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'meta_tags'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()

      table.jsonb('tags').notNullable()

      table.enum('generated_for', ['ui', 'webhook']).defaultTo('ui')

      table.string('app_id').unsigned().references('user_apps.id').onDelete('CASCADE')

      table.timestamp('created_at')

      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
