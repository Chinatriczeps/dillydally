exports.up = function(knex, Promise) {
   return knex.schema.createTable('users', (table) => {
      table.increments();
      table.string('name').notNull();
      table.string('email').notNull();
      table.string('password').notNull();
    })
    .createTable('todo', (table) => {
      table.increments();
      table.string('content').notNull();
      table.string('category').notNull();
      table.integer('user_id').references('id').inTable('users');
      table.timestamps(true, true)
      table.boolean('active').notNull();
   })
};

exports.down = function(knex, Promise) {
   return knex.schema.dropTable('users')
   .dropTable('todo')
};
