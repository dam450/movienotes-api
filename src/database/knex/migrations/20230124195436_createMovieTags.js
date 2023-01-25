/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable('movie_tags', (table) => {
    table.increments('id')
    //note_id int
    table.integer('note_id')
      .references('id')
      .inTable('movie_notes')
      .onDelete('CASCADE')
    //user_id int
    table.integer('user_id')
      .references('id')
      .inTable('users')
    //name varchar
    table.text('name')
  })
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable('movie_tags').hasTable()
}
