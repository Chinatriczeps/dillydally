exports.seed = function(knex, Promise) {
  return knex('todo').del()
    .then(function() {
    	return Promise.all([
    		knex('todo').insert({id:1, content: 'Harry Potter', category: 'Book', user_id: 1, date_created: '32/13/2031', active: true}),
    		knex('todo').insert({id:2, content: 'Sushi', category: 'Food', user_id: 1, date_created: '32/13/2031', active: true}),
    		knex('todo').insert({id:3, content: 'Split', category: 'Film', user_id: 1, date_created: '32/13/2031', active: true}),
    		knex('todo').insert({id:4, content: 'Vaccum', category: 'Product', user_id: 1, date_created: '32/13/2031', active: true})
    	])
    })

};