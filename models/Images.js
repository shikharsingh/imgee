// Images.js 

// initailize mongoose & schema constructor
mongoose = require('mongoose'); 
Schema = mongoose.Schema; 

// define an images collection to export 
module.exports = mongoose.model('Images', new Schema({ 
	name: String, 
	base64: String, 
	created: Date, 
	owner: String, 
	requestCount: Number	
})); 
