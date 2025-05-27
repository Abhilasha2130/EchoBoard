exports.up = function(knex) {
  return knex.schema.createTable('feedback_comments', function(table) {
    table.increments('id').primary();
    table.integer('feedback_id').unsigned().notNullable().references('id').inTable('feedback').onDelete('CASCADE');
    table.text('comment');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('feedback_comments');
};
