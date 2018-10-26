var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var cookieParser = require('cookie-parser');
module.exports = function(req, res, next) {
    var bearerToken;
    var bearerHeader = req.headers["authorization"];
    if (typeof bearerHeader !== 'undefined') {
        var bearer = bearerHeader.split(" ");
        bearerToken = bearer[1];
        req.token = bearerToken;
    }        
    // check header or url parameters or post parameters for token
    var token = req.body.token || req.param('token') || req.headers['x-access-token'] || req.token;
    // decode token
    if (token) {

        // verifies secret and checks exp
        jwt.verify(token, 'secret', function(err, decoded) {          
            if (err) {
                return res.json({ success: false, message: 'Failed to authenticate token.' });      
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;  
                next();
            }
        });

    } else {

        // if there is no token
        // return an error
        return res.status(403).send({ 
            success: false, 
            message: 'No token provided.'
        });

    }
}

