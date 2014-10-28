var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(app.get('port'), function () {
	console.log("Express server is listening on port "+ app.get('port') + "...")
})