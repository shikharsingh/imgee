// Users.js

// Initialize mongoose and mongoose Schema
var mongoose = require('mongoose'); 
var Schema = mongoose.Schema; 

// Define a mongoose model and pass it with module.exports 
module.exports = mongoose.model('Users', new Schema({
	name: String, 
	password: String, 
	created: Date, 
	isAdmin: Boolean
}));

