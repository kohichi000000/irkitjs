var express = require('express');
var http = require('http');
var path = require('path');
var index = require('./route/index.js');
var login = require('./route/login.js');

var app = express();

app.set('port', process.env.PORT || 3000);
app.set( 'view engine' , 'haml' );
app.use(express.static(path.join(__dirname, 'public')));

index.index();
login.index();

app.listen(app.get('port'), function () {
	console.log("Express server is listening on port "+ app.get('port') + "...")
})