const fetch = require('node-fetch')
require('dotenv').config();

const category = () => {

  const foodCategory = (input) => {

    return fetch(`https://www.food2fork.com/api/search?key=${process.env.FOOD_API}&q=${input}`)
    .then((res) => {
      return res.json()
    }).catch(err => {
      console.log("Line 13, error", err);
    }).then((data) => {
      return data.count > 1
    }).catch(err => {
      console.log("Line 16 error", err);
    })
  }

  const movieCategory = (input) => {

    return fetch(`http://www.omdbapi.com/?apikey=${process.env.MOVIE_API}&t=${input}`)
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
    bookCategory
  }

}

const { productCategory, movieCategory, foodCategory, bookCategory } = category()


module.exports = category





console.log(Date(Date.now()))

// foodCategory().then((result) => { //We would pass in req.body.text as an argument
//   if (result) {
//     res.send('food') // Here, we would actually add the note to the database under the category
//   } else {
//     movieCategory().then((result) => {
//       if (result) {
//         res.send('movie')
//       } else {
//         res.send('not found')
//       }
//     })
//   }
// })

// app.post('/new', (req, res) => {
//   foodCategory(req.body.text)
//   .then((result) => {
//     if (result) {
//       res.send('food')
//     } else {
//       movieCategory(req.body.text)
//       .then((result) => {
//         if(result) {
//           res.send('movie')
//         } else {
//           res.send('not found')
//         }
//       })
//     }
//   })
// })

