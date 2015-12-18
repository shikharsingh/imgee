//middleware.js
// init dependencies
var express = require('express'),
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose'), 
	Users = require('../models/Users'), 
	jwt = require('jsonwebtoken')
	config = require('../config');

// define a middleware to authenticate.
var authenticate = function(req, res, next){
	// check all params for the token 
	var token = req.body.token || req.query.token || req.headers['x-access-token']; 

	if (token) {
		
		jwt.verify(token, config.secret, function(err, decoded){
			if(err){
				return res.json({
					success: false, 
					message: 'failed to authenticate token'
				});
			} else {
				req.decoded = decoded;
				next();
			}
		});

	} else {
		return res.status(403).send({
			success: false, 
			message: 'No token provided'
		});
	}
}; 

// export
module.exports = authenticate;