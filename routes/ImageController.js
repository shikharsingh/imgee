var express = require('express'),
    bodyParser = require('body-parser'), 
    mongoose = require('mongoose'), 
	Images = require('../models/Images'),
	config = require('../config');

var router = express.Router(); 

router.get('/help', function(req, res){ 
	res.send('Welcome to the image router')
}); 

// todo: configure middleware to auth the user 

//define a route for working with named images
router.route('/:name')
	//define a POST route to create a new Image from base64 text 
	.post(function(req, res){
		if (!req.params.name || !req.body.base64)
			res.json({error:"invalid params!"});

		Images.findOne({name: req.params.name}, function(err, image){
			if(!err)
				res.json({error:"Image already exists with this name, try a put instead"});
		}); 

		var image = new Images ({
					name: req.params.name, 
					base64: req.body.base64,
					created: new Date(),
					owner: 'default', 
					requestCount: 0 
				})

		image.save(function(err, image){
			if(err)
				res.json({error: err});

			res.json({
				success: true, 
				id: image.id, 
				url: buildUrl(image.name)
			})
		});

	})
	//define a GET route to return an image by submitted name
	.get(function(req, res){
		if (!req.params.name)
			res.json({error:"invalid params!"});

		Images.findOne({name: req.params.name}, function(err, image){
			if(err)
				res.json({error:" couldn't find the image!"});
			var buff = new Buffer(image.base64, 'base64');
			res.setHeader('Content-Type', 'image/jpg'); 
			res.send(buff);
		}); 
		
	})
	//define a PUT route to update a submitted image
	.put(function(req, res){
		if (!req.params.name || !req.body.base64)
			res.json({error: "Invalid params"});

		Images.findOne({name: req.params.name}, function(err, image){
			if(err)
				res.json({error:" couldn't find the image!"});
			image.base64 = req.body.base64;
			image.save(function(err){
				if (err)
					res.json({error: "couldn't update the image!"});
				res.json({
					message: 'success - image updated',
					id: image.id, 
					url: buildUrl(image.name)
				});
			});
		});
	}); 

function buildUrl(name){
	return config.protocol + config.env + ":" + config.port + config.apiRoot + config.imageRoot +'/'+ image.name
}

module.exports = router;

