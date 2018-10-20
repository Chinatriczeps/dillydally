// const bcrypt = require('bcrypt')

// exports.seed = function(knex, Promise) {
//   return knex('todo').del()
//     .then(function() {
//     	return Promise.all([
//     		knex('todo').insert({id:1, content: 'Harry Potter', category: 'Book', user_id: 1, active: true}),
//     		knex('todo').insert({id:2, content: 'Sushi', category: 'Food', user_id: 2, active: true}),
//     		knex('todo').insert({id:3, content: 'Split', category: 'Film', user_id: 3, active: true}),
//     		knex('todo').insert({id:4, content: 'Vaccum', category: 'Product', user_id: 1, active: true}),
//         knex('todo').insert({id:5, content: 'Pumpkin', category: 'Food', user_id: 3, active: true})
//     	])
//     })
// };


exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(function() {
      return Promise.all([
        knex('users').insert({id:1, name: 'Jim Lin', email: 'jim@example.com', password: bcrypt.hashSync('123', 10)}),
        knex('users').insert({id:2, name: 'Zoe', email: 'zoe@example.com', password: bcrypt.hashSync('321', 10)}),
        knex('users').insert({id:3, name: 'Chingiz', email: 'chingiz@example.com', password: bcrypt.hashSync('213', 10)})
      ])
    })
};
