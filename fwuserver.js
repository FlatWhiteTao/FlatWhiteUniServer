'use strict';

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var swaggerUi = require('swagger-ui-express');
var swaggerDocument = require('./swagger.json');

var index = require('./routes/index');
var universities = require('./routes/university');
var port = 3000;

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


app.listen(port,function(){
	console.log('Server started on port' + port);
});