"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();
const cookieSession = require('cookie-session')
const bcrypt      = require('bcrypt')

const knexConfig  = require("./knexfile");
const knex        = require("knex")(knexConfig[ENV]);
const morgan      = require('morgan');
const knexLogger  = require('knex-logger');
const fetch       = require('node-fetch')
const { foodCategory, movieCategory, productCategory, bookCategory } = require('./api.js')()

// Seperated Routes for each Resource
const usersRoutes = require("./routes/users");
const todoRoutes = require('./routes/todo')

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

// Log knex SQL queries to STDOUT as well
app.use(knexLogger(knex));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));

app.use(cookieSession({
  name: 'session',
  secret: 'a dog jumped over the fence'
}))

app.use(express.static("public"));


// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use('/api/todo', todoRoutes(knex));

// Functions

// Function to insert data to the right category
const insertToCategory = (category, content, user) => {
  return knex('todo').returning('*')
  .insert({
    content: content,
    category: category,
    user_id: user,
    active: true
  })
}

// Home page
app.get("/", (req, res) => {
  if (req.session.user_id) {
    knex.select('*').from('users')
    .where({id: req.session.user_id})
    .then((users) => {
      // console.log(users());
      if (users.length === 0) {
        res.render('index', {user: undefined});  // yes, user is undefined in this case
      } else {
        res.render('index', {user: users[0]});
      }
    }).catch((err) => {
      console.log("Line 79", err);
      res.render('index', {user: undefined});  // yes, user is undefined in this case
    })
  } else {
    res.render('index', {user: undefined});  // yes, user is undefined in this case
  }
});


// Register a new user
app.post('/register', (req, res) => {
  const { name, email, password } = req.body

  if (name === '' || email === '' || password === '') {
    res.send('All fields are required')
    return;
  }

  knex('users').where({
    email: email
  }).first()
  .then((foundUser) => {
    if(foundUser) {
      res.send('Email is already registered!')
    } else {
      return knex('users').returning('*')
      .insert({name: name, email: email, password: bcrypt.hashSync(password, 10)})
    }
  }).catch(err => {
    console.log("line 83", err);
  }).then((user) => {
    if (user.length < 1) {
      res.send('A problem occurred trying to create the account!')
    }
    req.session.user_id = user[0].id
    res.redirect('/')
    return;
  }).catch(err => {
    console.log("line 91", err);
  })
})

// Login user
app.post('/login', (req, res) => {
  const { email, password } = req.body

  if (password === '' || email === "") {
    res.send('Both the email and password fields are required')
    return;
  }

  knex.select('id', 'email', 'password').from('users')
  .then((arrOfUsers) => {
    let userMatch;
    arrOfUsers.forEach((user) => {
      if (user.email === email) {
        userMatch = user
      }
    })

    if (userMatch === undefined) {
      res.send('Wrong email or password')
      return;
    }

    return userMatch
  }).catch(err => {
    console.log("line 147", err);
  }).then((user) => {
    if (bcrypt.compareSync(password, user.password)) {
      req.session.user_id = user.id
      res.redirect('/')
    } else {
      res.send('Wrong email or password')
      return;
    }
  }).catch(err => {
    console.log("line 157", err);
  })

})

// Logout user
app.post('/logout', (req, res) => {
  req.session = null;
  res.redirect('/');
})

// Edit user profile information
app.post('/users/:id/edit', (req, res) => {
  knex('users').where({
    id: req.params.id
  }).update({
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  }).then(() => {
    res.redirect('/');
    return;
  }).catch(err => {
    console.log("line 178", err);
  })
})

// Editing category of each todo
app.post('/todo/:id/edit', (req, res) => {
  return knex('todo').returning('*').where({
    id: req.body.id,
  }).update({
    category: req.body.catagory
  }).then((result) => {
    res.json(result)
  }).catch(err => {
    console.log("Editing category of each todo", err);
  })
})

// Deleting a todo
app.post('/todo/:id/delete', (req, res) => {
  console.log(req.params.id)
  knex('todo').where('id', req.params.id)
    .del()
    .then(() => {
    res.redirect('/')
  }).catch(err => {
    console.log("line 196", err);
  })
})


// Adding a new todo
app.post('/todo/new', (req, res) => {
  if(!req.body.text){
    res.send('You must insert something')
  }
  bookCategory(req.body.text)
  .then((result) => {
    if (result) {
      insertToCategory('Book', req.body.text, req.session.user_id).then(() => {
        res.status(200).end()
      })
    } else {
      movieCategory(req.body.text)
      .then((result) => {
        if (result) {
          insertToCategory('Film', req.body.text, req.session.user_id).then(() => {
            res.status(200).end()
          })
        } else {
          foodCategory(req.body.text)
          .then((result) => {
            if (result) {
              insertToCategory('Food', req.body.text, req.session.user_id).then(() => {
                res.status(200).end()
              })
            } else {
              productCategory(req.body.text)
              .then((result) => {
                insertToCategory('Product', req.body.text, req.session.user_id).then(() => {
                  res.status(200).end()
                })
              })
            }
          })
        }
      })
    }
  })
})

app.listen(PORT, () => {
  console.log("App listening on port " + PORT);
});
