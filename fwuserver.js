'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// Swagger Interactive API set up
var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');


//Mlab MongoDB connection 
const mongoose = require('mongoose');
var mongoDB = 'mongodb://fwu:123456@ds161146.mlab.com:61146/flatwhiteunidb';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.Promise = global.Promise;

// Routers Set Up
var index = require('./routes/index');
var universities = require('./routes/university');
var schools = require('./routes/school');
var port = 8081;

var app = express();

//View Engine

app.set('views',path.join(__dirname,'views'));
app.set('view engine', 'ejs');
app.engine('html',require('ejs').renderFile);

//Set Static Folder (React)
app.use(express.static(path.join(__dirname,'client')));

//Body Parse Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use('/',index);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api',universities);
app.use('/api',schools);


app.listen(port,function(){
	console.log('Server started on port' + port);
});