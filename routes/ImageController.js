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

//define a post route to create a new Image 
router.route('/:name')
	.post(function(req, res){
		//scrub inputs 
		if (!req.params.name || !req.body.base64)
			throwError('500 invalid params'); 

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
			console.log(image);
			res.json({
				success: true, 
				id: image.id, 
				url: buildUrl(image.name)
			})
		});

	})
	.get(function(req, res){
		if (!req.params.name)
			res.json({error: "Invalid params"});

		Images.findOne({name: req.params.name}, function(err, image){
			if(err)
				throwError("couldn't find the image");
			var buff = new Buffer(image.base64, 'base64');
			res.setHeader('Content-Type', 'image/jpg'); 
			res.send(buff);
		}); 
		
	})
	.put(function(req, res){
		if (!req.params.name || !req.body.base64)
			res.json({error: "Invalid params"});

		Images.findOne({name: req.params.name}, function(err, image){
			if(err)
				throwError("couldn't find the image");
			image.base64 = req.body.base64;
			image.save(function(err){
				if (err)
						throwError("couldn't update the image"); 
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

