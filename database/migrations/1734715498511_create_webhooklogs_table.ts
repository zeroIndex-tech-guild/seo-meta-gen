import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'webhooklogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.string('id').notNullable().primary()

      table.string('url').notNullable()

      table.string('meta_id').unsigned().references('meta_gens.id').onDelete('CASCADE')

      table.enum('generated_for', ['ui', 'webhook']).defaultTo('ui')

      table.enum('status', ['success', 'failed']).defaultTo('success')

      table.timestamp('created_at').notNullable()
      table.timestamp('updated_at').notNullable()
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
