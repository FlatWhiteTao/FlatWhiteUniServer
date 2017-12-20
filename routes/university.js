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

// Defined University Model
const University = require('../models/university')


// Get a list of universities in the database
router.get('/universities',function(req,res,next){
	University.find(function(err,universities){
		if(err){
			res.send(err);
		}
		res.json(universities);
	});
});

// Save a new university to the db via the university model
router.post('/universities',function(req,res,next){
	var university = new University(req.body);
	university.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(university);
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
		updUniversityValue.title = university.city;
	}

	if(!updUniversityValue){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	}else{
		var updUniversity = new University(updUniversityValue);
		University.findOneAndUpdate({_id: req.params.id}, updUniversityValue, {}, function(err, university){
					if(err){
							res.send(err);
					}
					res.json(university);
			});
	}
});
	

module.exports = router;