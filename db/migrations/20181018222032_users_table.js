
exports.up = function(knex, Promise) {
  return Promise.all([
    knex.schema.createTable('users', (table) => {
	    table.increments();
	    table.string('name').notNull();
	    table.string('email').notNull();
	    table.string('password').notNull();
	  })
  ]);
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('users');
};
