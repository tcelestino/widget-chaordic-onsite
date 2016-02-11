'use strict';

var express = require('express');
var app = express();
var path = require('path');
var chalk = require('chalk');
var port = 8080;

app.use(express.static(__dirname + '/www'));
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/www/index.html'));
});

app.listen(port, function () {
   console.log(chalk.cyan( "Server running on port " + port ));
});