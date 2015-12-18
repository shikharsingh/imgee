//UserController.js
var express = require('express'),
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose'), 
	Users = require('../models/Users'); 

var router = express.Router(); 

router.get('/', function(req, res){
	res.send('Welcome to the User router')
});

module.exports = router;