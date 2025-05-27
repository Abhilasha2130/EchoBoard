exports.up = function(knex) {
  return knex.schema.createTable('feedback_ratings', function(table) {
    table.increments('id').primary();
    table.integer('feedback_id').unsigned().notNullable().references('id').inTable('feedback').onDelete('CASCADE');
    table.integer('rating').notNullable().checkBetween([1, 5]); // Alternative way in newer Knex
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('feedback_ratings');
};
