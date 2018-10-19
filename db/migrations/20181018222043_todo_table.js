
exports.up = function(knex, Promise) {
  return Promise.all([
	knex.schema.createTable('todo', (table) => {
	   	table.increments();
	   	table.string('content').notNull();
	   	table.string('category').notNull();
	   	table.integer('user_id').references('id').inTable('users');
	   	table.string('date_created').notNull();
	   	table.string('active').notNull();
   })
  ]);
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('todo');
};
