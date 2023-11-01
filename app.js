// Package 포함
var express = require('express');
var http = require('http');
var path = require('path');
var static = require('serve-static');

var app = express();
app.use('/node_modules', express.static(path.join(__dirname, '/node_modules')));
app.use('/assets', static(path.join(__dirname, 'assets')));
app.use('/data', require('./data/query'));
app.use('/conf', require('./conf/setting'));
app.use('/uploads', static(path.join(__dirname, 'uploads')));

http.createServer(app).listen(3000, function () {
    console.log('Express Server Start : port 3000');
})


app.get("/", function(req, res){
    res.sendfile("index.html");
});