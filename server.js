"use strict";

require('dotenv').config();

const PORT        = process.env.PORT || 8080;
const ENV         = process.env.ENV || "development";
const express     = require("express");
const bodyParser  = require("body-parser");
const sass        = require("node-sass-middleware");
const app         = express();

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
app.use(express.static("public"));

// Mount all resource routes
app.use("/api/users", usersRoutes(knex));
app.use('/api/todo', todoRoutes(knex));

// Home page
app.get("/", (req, res) => {
  res.render("index");
});

// Register a new user
app.post('/register', (req, res) => {
  res.send('Registering user')
})

// Login user
app.post('/login', (req, res) => {
  res.send('Logged in')
})

// Logout user
app.post('/logout', (req, res) => {
  res.send('Logged out')
})

// Edit user profile information
app.post('/users/:id/edit', (req, res) => {
  res.send('User updated')
})

// Editing category of each todo
app.post('/todo/:id/edit', (req, res) => {
  res.send('Todo updated')
})

// Deleting a todo
app.post('/todo/:id/delete', (req, res) => {
  res.send('Todo deleted')
})

// Adding a new todo
app.post('/todo/new', (req, res) => {
  foodCategory(req.body.text)
  .then((result) => {
    if (result) {
      res.send('food')
    } else {
      movieCategory(req.body.text)
      .then((result) => {
        if (result) {
          res.send('movie')
        } else {
          bookCategory(req.body.text)
          .then((result) => {
            if (result) {
              res.send('book')
            } else {
              productCategory(req.body.text)
              .then((result) => {
                res.send('product')
              })
            }
          })
        }
      })
    }
  })
})

app.listen(PORT, () => {
  console.log("Example app listening on port " + PORT);
});
