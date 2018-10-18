const fetch = require('node-fetch')

const category = () => {

  const foodCategory = (input) => {

   return fetch(`https://api.yelp.com/v3/categories/${input}`, {
      headers: {
        'Authorization': 'Bearer rr7qz1TcZW_C2Z0A1CMl6LjkaB5MDgKSR-c_3QTqHtMOflLHNwp-fNGIRx3u85HyEvEOx5JnMIliQpFvB1crJd-Sz4zzPpm_GLlMEQPFAmqLEH_zfomvPB2qXs7HW3Yx'
      }
    }).then((res) => {
      return res.json()
    }).then((data) => {
      return !data.error
    })
  }

  const movieCategory = (input) => {

    return fetch(`http://www.omdbapi.com/?apikey=78a67806&t=${input}`)
    .then((res) => {
      return res.json()
    }).then((data) => {
      return data.Response === 'True'
    })
  }

  return {
    foodCategory,
    movieCategory
  }

}

module.exports = category

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

