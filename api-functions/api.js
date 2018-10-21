const fetch = require('node-fetch')
require('dotenv').config();

const category = (knex) => {

  const insertToCategory = (category, content, user) => {
    return knex('todo').returning('*')
    .insert({
      content: content,
      category: category,
      user_id: user,
      active: true
    })
  }

  const foodCategory = (input) => {

    return fetch(`https://api.yelp.com/v3/businesses/search?term=${input}&location=vancouver&categories=restaurants&limit=1`,
      {
        headers: {'Authorization': `Bearer ${process.env.YELP_API}` }
      })
    .then((res) => {
      return res.json()
    }).catch(err => {
      console.log("Line 13, error", err);
    }).then((data) => {
      return data.total > 0
    }).catch(err => {
      console.log("Line 16 error", err);
    })
  }

  const movieCategory = (input) => {

    return fetch(`http://www.omdbapi.com/?apikey=${process.env.MOVIE_API}&t=${input}&type=movie`)
    .then((res) => {
      return res.json()
    }).catch(err => {
      console.log("Line 27, dude", err);
    }).then((data) => {
      return data.Response === 'True'
    }).catch(err => {
      console.log("Movie error", err);
    })

  }

  const productCategory = (input) => {

    return fetch(`http://open.api.ebay.com/shopping?callname=FindProducts&responseencoding=JSON&appid=${process.env.PRODUCT_API}&siteid=0&version=967&QueryKeywords=${input}&AvailableItemsOnly=true&MaxEntries=1`)
    .then((res) => {
      return res.json()
    }).catch(err => {
      console.log("Line 42", err);
    }).then((data) => {
      return !data.Errors
    })
  }

  const bookCategory = (input) => {
    return fetch(`https://www.googleapis.com/books/v1/volumes?q=${input}&maxResults=1&filter=full`)
    .then((res) => {
      return res.json()
    }).catch(err => {
      console.log("line 53", err);
    }).then((data) => {
      return data.totalItems > 0
    }).catch(err => {
      console.log("line 57", err);
    })
  }

  return {
    foodCategory,
    movieCategory,
    productCategory,
    bookCategory,
    insertToCategory
  }
}

module.exports = category

