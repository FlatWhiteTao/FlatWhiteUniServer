// Set up
var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
const mongoose = require('mongoose');

//Mlab MongoDB connection 
var mongoDB = 'mongodb://fwu:123456@ds161146.mlab.com:61146/flatwhiteunidb';
mongoose.connect(mongoDB, {
  useMongoClient: true
});
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
mongoose.Promise = global.Promise;

// Defined School Model
const School = require('../models/school');


// Get a list of schools in the database
router.get('/schools',function(req,res,next){
	School.find(function(err,schools){
		if(err){
			res.send(err);
		}
		res.json(schools);
	});
});

// Save a new university to the db via the university model
router.post('/schools',function(req,res,next){
	var school = new School(req.body);
	school.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(school);
    }
  });
});



// Get Single Univeristy by Id
router.get('/universities/:id',function(req,res,next){
	University.findById(req.params.id,function(err,university){
		if(err){
			res.send(err);

		}
		res.json(university);
	});
});
	

// Delete a university from the db
router.delete('/universities/:id',function(req,res,next){
	University.findByIdAndRemove(req.params.id,function(err,university){
		if(err){
			res.send(err);

		}
		res.json(university);
	});
});


// Update a University In db
router.put('/universities/:id',function(req,res,next){

	var university = new University(req.body);
	var updUniversityValue = {};

	if(university.name){
		updUniversityValue.name = university.name;
	}

	if(university.city){
		updUniversityValue.city = university.city;
	}

	if(!updUniversityValue){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	}else{
		University.findOneAndUpdate({_id: req.params.id}, updUniversityValue, {}, function(err, university){
					if(err){
							res.send(err);
					}
					res.json(university);
			});
	}
});


// Get Single University By Name
router.get('/universities/name/:name', function(req, res, next){
    
	//store the specific query conditions
	var query = {};
	if(req.params.name){
			query.name = req.params.name;
	}

	University.findOne(query, function(err, tasks){
			if(err){
					res.send(err);
			}
			// res.send(query);
			res.json(tasks);
	});
});

// Get One/Some Universities By City
router.get('/universities/city/:city', function(req, res, next){
    
	//store the specific query conditions
	var query = {};
	if(req.params.city){
			query.city = req.params.city;
	}

	University.find(query, function(err, tasks){
			if(err){
					res.send(err);
			}
			// res.send(query);
			res.json(tasks);
	});
});
	

module.exports = router;