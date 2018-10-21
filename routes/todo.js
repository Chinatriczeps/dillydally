"use strict";

const express = require('express');
const router  = express.Router();

module.exports = (knex) => {

  router.get("/", (req, res) => {
    knex
      .select("*")
      .from("todo")
      .then((results) => {
        res.json(results);
    });
  });

  router.get('/:id', (req, res) => {
    knex
    .select('*')
    .from('todo')
    .where({user_id: req.params.id})
    .then((results) => {
      res.json(results)
    })
  })

  return router;
}
