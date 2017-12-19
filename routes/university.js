var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');

const mongoose = require('mongoose');
var db = mongojs('mongodb://fwu:123456@ds161146.mlab.com:61146/flatwhiteunidb',['universities']);
const University = require('../models/university')


mongoose.Promise = global.Promise;

// Get a list of universities in the database
router.get('/universities',function(req,res,next){
	db.universities.find(function(err,universities){
		if(err){
			res.send(err);
		}
		res.json(universities);
	});
});


// Save a new university to the db
router.post('/universities',function(req,res,next){
	
	//University.create(req.body).then(function(university){
		var university = req.body;
		if(!university.name || !university.city){
		res.status(400);
		res.json({
			"error" : " Bad Date"
		});
	}else{
		db.universities.save(university,function(err,university){
			if(err){
				res.send(err);
			}
			res.json(university);
		});
	}
	});
//});


// Get Single Univeristy by Id
router.get('/universities/:id',function(req,res,next){
	db.universities.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,university){
		if(err){
			res.send(err);

		}
		res.json(university);
	});
});

// Delete a university from the db

router.delete('/universities/:id',function(req,res,next){
	db.universities.remove({_id:mongojs.ObjectId(req.params.id)},function(err,university){
		if(err){
			res.send(err);

		}
		res.json(university);
	});
});

module.exports = router;