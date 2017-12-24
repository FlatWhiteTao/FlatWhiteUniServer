// Set up
var express = require('express');
var router = express.Router();

// Defined University Model
const University = require('../models/university');


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
		updUniversityValue.city = university.city;
	}

	if(university.geopoint.lat){
		updUniversityValue.geopoint.lat = university.geopoint.lat;
	}

	if(university.geopoint.lng){
		updUniversityValue.geopoint.lng = university.geopoint.lng;
	}

	if(university.uniBadgeId){
		updUniversityValue.uniBadgeId = university.uniBadgeId;
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