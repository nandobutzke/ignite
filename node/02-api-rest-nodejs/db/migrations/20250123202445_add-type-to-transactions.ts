import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.enu('type', ['credit', 'debit'])
      .after('amount')
      .notNullable()
      .defaultTo('credit')
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.alterTable('transactions', (table) => {
    table.dropColumn('type')
  })
}

