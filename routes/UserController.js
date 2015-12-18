//UserController.js
var express = require('express'),
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose'), 
	Users = require('../models/Users'), 
	jwt = require('jsonwebtoken')
	config = require('../config');
	//authenticate = require('./Middleware')

var router = express.Router(); 

router.get('/', function(req, res){
	res.send('Welcome to the User router')
});

//router.use(authenticate);

router.get('/setup', function(req, res){
	var shix = new Users({
		username: 'shix', 
		password: 'password', 
		created: new Date(), 
		admin: true, 
		imageCount: 0
	})

	Users.findOne({username: shix.username}, function(err, user){
		if(!err)
		res.json({error: "The base user account has already been set up!"});
	});

	shix.save(function(err){
		if(err)
			res.send("something happened...");
		res.json({
			message: 'success - user created',
			username: shix.username 
		}); 
	}); 
}); 

router.route('/authenticate/:username')
	.post(function(req, res){

		if(!req.params.username || !req.body.password){
			req.send("invalid params");
		}

		Users.findOne({username: req.params.username}, function(err, user){
			if (err)
				req.send("invalid username"); 
			
			if (user.password != req.body.password) {
				req.send("invalid password"); 
			}

	        var token = jwt.sign(user, config.secret, {
	          expiresInMinutes:1440 // expires in 24 hours
	        }); 

	        // return success including token as JSON 
	        res.json({
	          success: true, 
	          message: "enjoy your token!", 
	          token: token
	        });
		}); 
	}); 

module.exports = router;