// Set up
var express = require('express');
var router = express.Router();

// Defined Major Model
const Major = require('../models/major');


// Get a list of majors in the database
router.get('/majors',function(req,res,next){
	Major.find(function(err,majors){
		if(err){
			res.send(err);
		}
		res.json(majors);
	});
});

// Save a new major to the db via the major model
router.post('/majors',function(req,res,next){
	var major = new Major(req.body);
	major.save(function (err) {
    if (err) {
      next(err);
    } else {
      res.json(major);
    }
  });
});



// Get Single Major by Id
router.get('/majors/:id',function(req,res,next){
	Major.findById(req.params.id,function(err,major){
		if(err){
			res.send(err);

		}
		res.json(major);
	});
});
	

// Delete a major from the db by id
router.delete('/majors/:id',function(req,res,next){
	Major.findByIdAndRemove(req.params.id,function(err,major){
		if(err){
			res.send(err);

		}
		res.json(major);
	});
});


// Update a major In db
router.put('/majors/:id',function(req,res,next){

	var major = new Major(req.body);
	var updMajorValue = {};

	if(major.name){
		updMajorValue.name = major.name;
	}

	if(major.schoolName){
		updMajorValue.schoolName = major.schoolName;
	}

	if(major.schoolId){
		updMajorValue.schoolId = major.schoolId;
	}

	if(!updMajorValue){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	}else{
		Major.findOneAndUpdate({_id: req.params.id}, updMajorValue, {}, function(err, major){
					if(err){
							res.send(err);
					}
					res.json(major);
			});
	}
});


// Get Major(s) By Name
router.get('/majors/name/:name', function(req, res, next){
    
	//store the specific query conditions
	var query = {};
	if(req.params.name){
			query.name = req.params.name;
	}

	Major.find(query, function(err, tasks){
			if(err){
					res.send(err);
			}
			// res.send(query);
			res.json(tasks);
	});
});

// Get One/Some Schools By school Name
router.get('/majors/schoolName/:schoolName', function(req, res, next){
    
	//store the specific query conditions
	var query = {};
	if(req.params.schoolName){
			query.schoolName = req.params.schoolName;
	}

	Major.find(query, function(err, tasks){
			if(err){
					res.send(err);
			}
			// res.send(query);
			res.json(tasks);
	});
});

// Get One/Some Schools By University Id
router.get('/majors/schoolId/:schoolId', function(req, res, next){
    
	//store the specific query conditions
	var query = {};
	if(req.params.schoolId){
			query.schoolId = req.params.schoolId;
	}

	Major.find(query, function(err, tasks){
			if(err){
					res.send(err);
			}
			// res.send(query);
			res.json(tasks);
	});
});
	

module.exports = router;