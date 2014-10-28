var express = require('express');
var app = express();

var index = {};

index.index = function(){
	app.use('/', function ( req , res , next ){
		res.render( '/view/index' , function ( err , html ){});
		next();
	});
}

module.exports = index;