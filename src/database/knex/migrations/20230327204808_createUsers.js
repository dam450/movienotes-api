/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = (knex) => knex.schema.createTable('users', table => {
  table.increments('id')
  table.text('name').notNullable()
  table.specificType('email', 'text collate nocase').unique().notNullable();
  table.text('password').notNullable()
  table.text('avatar')
  table.timestamp('created_at').defaultTo(knex.fn.now())
  table.timestamp('updated_at').defaultTo(knex.fn.now())
});


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = (knex) => knex.schema.dropTable('users').hasTable()