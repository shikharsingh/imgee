// Import package dependencies
var express = require('express'), 
	mongoose = require('mongoose'), 
	bodyParser = require('body-parser'), 
	morgan = require('morgan'), 
	jwt = require('jsonwebtoken'); 

// Import app dependencies 
var config = require('./config'), 
	Users = require('./models/Users'), 
	Images = require('./models/Images'), 
	ImageRouter = require('./routes/ImageController'), 
	UserRouter = require('./routes/UserController'); 

console.log(config.baseUrl);

// Configuration =====================================
var app = express(); 
app.use(morgan('dev')); 
mongoose.connect(config.database); 
var port = process.env.port || config.port; 

// Configure bodyparser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

// Configure Routers 
app.use(config.apiRoot+config.imagesRoot, ImageRouter);
app.use(config.apiRoot+config.usersRoot, UserRouter);


app.listen(port);
console.log('Imgee running on port ' + port);