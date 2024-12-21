import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'web_hook_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()

      table.string('url').notNullable()

      table.jsonb('payload').notNullable()

      table.jsonb('response').notNullable()

      table.integer('attempt_count').defaultTo(0)

      table.jsonb('error')

      table.enum('status', ['success', 'failed']).defaultTo('success')

      table.string('meta_tag_id').unsigned().references('meta_tags.id').onDelete('CASCADE')

      table.timestamp('created_at').notNullable()

      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
