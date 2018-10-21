const bcrypt = require('bcrypt')

exports.seed = function(knex) {

  const deleteAllTodo = knex('todo').del()
  const deleteAllUsers = deleteAllTodo.then(() => {
    return knex('users').del()
  })

  const createNewUsers = deleteAllUsers.then(() => {
    return knex('users')
    .returning('*')
    .insert([
      {id:1, name: 'Jim Lin', email: 'jim@example.com', password: bcrypt.hashSync('123', 10)},
      {id:2, name: 'Zoe', email: 'zoe@example.com', password: bcrypt.hashSync('321', 10)},
      {id:3, name: 'Chingiz', email: 'chingiz@example.com', password: bcrypt.hashSync('213', 10)}
      ])
  })

  const createTodo = createNewUsers.then(() => {
    return knex('todo')
    .returning('*')
    .insert([
        {id:1, content: 'Harry Potter', category: 'Book', user_id: 1, active: true},
        {id:2, content: 'Sushi', category: 'Food', user_id: 2, active: true},
        {id:3, content: 'Split', category: 'Film', user_id: 3, active: true},
        {id:4, content: 'Vaccum', category: 'Product', user_id: 1, active: true},
        {id:5, content: 'Pumpkin', category: 'Food', user_id: 3, active: true}
      ])
  })
  return createTodo
}
