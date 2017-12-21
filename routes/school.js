// Set up
var express = require('express');
var router = express.Router();

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



// Get Single School by Id
router.get('/schools/:id',function(req,res,next){
	School.findById(req.params.id,function(err,school){
		if(err){
			res.send(err);

		}
		res.json(school);
	});
});
	

// Delete a school from the db by id
router.delete('/schools/:id',function(req,res,next){
	School.findByIdAndRemove(req.params.id,function(err,school){
		if(err){
			res.send(err);

		}
		res.json(school);
	});
});


// Update a School In db
router.put('/schools/:id',function(req,res,next){

	var school = new School(req.body);
	var updSchoolValue = {};

	if(school.name){
		updSchoolValue.name = school.name;
	}

	if(school.universityName){
		updSchoolValue.universityName = school.universityName;
	}

	if(school.universityId){
		updSchoolValue.universityId = school.universityId
	}

	if(!updSchoolValue){
		res.status(400);
		res.json({
			"error": "Bad Data"
		});
	}else{
		School.findOneAndUpdate({_id: req.params.id}, updSchoolValue, {}, function(err, school){
					if(err){
							res.send(err);
					}
					res.json(school);
			});
	}
});


// Get School(s) By Name
router.get('/schools/name/:name', function(req, res, next){
    
	//store the specific query conditions
	var query = {};
	if(req.params.name){
			query.name = req.params.name;
	}

	School.find(query, function(err, tasks){
			if(err){
					res.send(err);
			}
			// res.send(query);
			res.json(tasks);
	});
});

// Get One/Some Schools By University Name
router.get('/schools/universityName/:universityName', function(req, res, next){
    
	//store the specific query conditions
	var query = {};
	if(req.params.universityName){
			query.universityName = req.params.universityName;
	}

	School.find(query, function(err, tasks){
			if(err){
					res.send(err);
			}
			// res.send(query);
			res.json(tasks);
	});
});

// Get One/Some Schools By University Id
router.get('/schools/universityId/:universityId', function(req, res, next){
    
	//store the specific query conditions
	var query = {};
	if(req.params.universityId){
			query.universityId = req.params.universityId;
	}

	School.find(query, function(err, tasks){
			if(err){
					res.send(err);
			}
			// res.send(query);
			res.json(tasks);
	});
});
	

module.exports = router;