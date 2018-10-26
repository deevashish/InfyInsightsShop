var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Order = require('../models/Order.js');
var User = require('../models/User.js');
var Book = require('../models/Book.js');
var multer = require('multer');
var app = express();
var token= require('./middleware');

router.get('/', function(req, res, next) {
  
    Order.find(function (err, products) {
      if (err) return next(err);
      res.json(products);
    });
  });

router.post('/:books/:user',token, function(req, res, next) {  
  // var book;
  // var user;
  // book=Book.findById(req.params.books, function (err, book) {
  //   if (err) return next(err);
  //   return res.json(book);    
  // });
  // var book=Book.findById(req.params.books);
  // var user=User.findById(req.params.user);
  // console.log(book);
  // user= User.findById(req.params.user, function (err, user) {
  //   if (err) return next(err);
  //    return res.json(user);    
  // });
  // console.log(book);
  req.body['books']= mongoose.mongo.ObjectID(req.params.books);
  req.body['user']=mongoose.mongo.ObjectID(req.params.user);
  
    Order.create(req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });
  
router.delete('/:id', token, function(req, res, next) {
  Order.findByIdAndRemove(req.params.id, req.body, function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
  });

  router.get('/orderhistory/:id', function(req, res, next) {
    Order.find().populate({'path':'user',match:{'id':req.params.id}})
.exec(function (err, resp) {
  var result = resp.filter(function(i){
    res.json(resp);
  }); 
})
    // Book.find(req.params.id, function (err, post) {
    //   if (err) return next(err);
    //   res.json(post);
    // });
  });
  
module.exports = router;