var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var User = require('../models/User.js');
var jwt = require('jsonwebtoken');
var token= require('./middleware');
var cookieParser = require('cookie-parser')


/* SAVE BOOK */
router.post('/', function(req, res, next) {
  bcrypt.hash(req.body.password, 10, function(err, hash){
    if(err) {
       return res.status(500).json({
          message: err
       });
    }
    else
    {
    req.body['password']=hash;
  
    User.create(req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
    
  });
}
});
});

router.get('/',token, function(req, res, next) {
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
      // if(post["username"]!=req.params.username || post["password"]!=req.params.password)
      if(bcrypt.compare(req.params.password, post["password"]))
      {  
          const JWTToken = jwt.sign({
            username: post.username,
               _id: post._id
             },
             'secret',
              {
                expiresIn: '2h'
              });
              post["token"]=JWTToken;
              res.cookie('auth',JWTToken);
        return res.json(post);        
      }
      else
      {
        return res.status(400).json({message:'Username or password is incorrect'});        
      }      
      if (err) return next(err);
      // else
      // {
      //   res.json(post);
      // }      
    });
  });



module.exports = router;