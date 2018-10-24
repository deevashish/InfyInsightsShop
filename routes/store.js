var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Store = require('../models/Store.js');


/* GET ALL BOOKS */
router.get('/', function(req, res, next) {
    Store.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

/* SAVE BOOK */
router.post('/', function(req, res, next) {
    Store.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;