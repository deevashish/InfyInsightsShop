var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var User = require('../models/User.js');

/* SAVE BOOK */
router.post('/', function(req, res, next) {
    User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.get('/', function(req, res, next) {
    User.find(function (err, products) {
    if (err) return next(err);
    res.json(products);
  });
});

router.get('/:id', function(req, res, next) {
  User.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

router.post('/authenticate/:username/:password', function(req, res, next) {
    User.findOne({username: req.params.username}, function (err, post) {
      if(post===null)
      {        
        return res.status(400).json({message:'User does not Exist'});        
      }
      if(post["username"]!=req.params.username || post["password"]!=req.params.password)
      {        
        return res.status(400).json({message:'Username or password is incorrect'});        
      }      
      if (err) return next(err);
      else
      {
        res.json(post);
      }      
    });
  });



module.exports = router;