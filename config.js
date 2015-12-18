// config.js
module.exports = {
	'secret' : 'secretToken', 
	'database' : 'mongodb://node:node@ds033125.mongolab.com:33125/apitest',
	'env' : 'localhost',
	'protocol' : 'http://',
	'port' : '8080', 
	'apiRoot' : '/api', 
	'imagesRoot' : '/images',
	'usersRoot' : '/users', 
}; 

/* Bugs to fix 
 - Users API needs to handle errors with control flow. requests continue... 
 */ 
 