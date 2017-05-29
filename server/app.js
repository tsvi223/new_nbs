var express = require("express");
var path = require("path");
var port =   '8080';
var app = express();
var http = require('http').createServer(app);
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/app', express.static(path.join(__dirname, '../app')))
app.use('/assets', express.static(path.join(__dirname, '../assets')))

require('./route')(app);

http.listen(port ,function(){
    console.log('Starting Web Server on Port   ' + port );
});
