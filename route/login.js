var express = require('express');
var app = express();

var login = {};

login.index = function(){
	app.use('/login', function ( req , res , next ){
		res.render( '/view/login' , function ( err , html ){} );
		next();
	});
}

module.exports = login;