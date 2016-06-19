"use strict";

var express = require('express');
var app = express();
var bodyParser = require('body-parser');

/**
 * Mongo connection
 * To start a Mongo container execute: docker run -p 27017:27017 --name test-mongo -d mongo
 */
var mongoose = require('mongoose');
var MONGO_ADDR = process.env.MONGO_PORT_27017_TCP_ADDR || '0.0.0.0';
var MONGO_PORT = process.env.MONGO_PORT_27017_TCP_PORT || 27017;
mongoose.connect(`mongodb://${MONGO_ADDR}:${MONGO_PORT}/test-mongo`);

// Use global promise as Mongoose promise are deprecated
mongoose.Promise = global.Promise;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 9090;

/**
 * Default route
 */
app.use(function (req, res, next) {
    console.log('New Request');
    next();
});

app.get('/', function (req, res) {
    res.json({message: 'Hello!'});
});

/**
 * API routing
 */
app.use('/api/application', require('./app/router/applications'));
app.use('/api/company', require('./app/router/companies'));
app.use('/api/enum', require('./app/router/enums'));
app.use('/api/opportunity', require('./app/router/opportunities'));

/**
 * Error management
 */
app.use(function (err, req, res, next) {
    console.log(err.stack);
    res.status(500).json({'error': err});
});

/**
 * Start the server
 */
app.listen(port);
console.log('Listening on ' + port);
