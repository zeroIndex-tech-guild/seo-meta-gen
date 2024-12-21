import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'meta_tag_logs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()

      table.string('job_id').notNullable()

      table.string('meta_tag_id').unsigned().references('meta_tags.id').onDelete('CASCADE')

      table.enum('status', ['success', 'failed']).defaultTo('success')

      table.timestamp('created_at')

      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
