exports.seed = function(knex, Promise) {
  return knex('todo').del()
    .then(function() {
    	return Promise.all([
    		knex('todo').insert({id:1, content: 'Harry Potter', category: 'Book', user_id: 1, date_created: '2011-05-20', active: true}),
    		knex('todo').insert({id:2, content: 'Sushi', category: 'Food', user_id: 2, date_created: '2018-07-30', active: true}),
    		knex('todo').insert({id:3, content: 'Split', category: 'Film', user_id: 3, date_created: '2015-08-15', active: true}),
    		knex('todo').insert({id:4, content: 'Vaccum', category: 'Product', user_id: 1, date_created: '2012-12-20', active: true}),
        knex('todo').insert({id:5, content: 'Pumpkin', category: 'Food', user_id: 3, date_created: '2013-02-17', active: true})
    	])
    })
};


// exports.seed = function(knex, Promise) {
//   return knex('users').del()
//     .then(function() {
//       return Promise.all([
//         knex('users').insert({id:1, name: 'Jim Lin', email: 'jim@example.com', password: '123'}),
//         knex('users').insert({id:2, name: 'Zoe', email: 'zoe@example.com', password: '321'}),
//         knex('users').insert({id:3, name: 'Chingiz', email: 'chingiz@example.com', password: '213'})
//       ])
//     })
// };
