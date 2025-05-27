exports.up = function(knex) {
  return knex.schema.createTable('roles', function(table) {
    table.increments('id').primary();
    table.string('role_name', 50).unique().notNullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('roles');
};
