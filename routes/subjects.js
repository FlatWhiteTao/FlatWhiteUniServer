var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var db = mongojs('mongodb://fwu:123456@ds161146.mlab.com:61146/flatwhiteunidb',['subjects']);

// Get All Subjects
router.get('/subjects',function(req,res,next){
	db.subjects.find(function(err,subjects){
		if(err){
			res.send(err);

		}
		res.json(subjects);
	});
});

// Get Single Subject
router.get('/subject/:id',function(req,res,next){
	db.subjects.findOne({_id:mongojs.ObjectId(req.params.id)},function(err,subject){
		if(err){
			res.send(err);

		}
		res.json(subject);
	});
});

// Save Subject
router.post('/subject',function(req,res,next){
	var subject = req.body;
	if(!subject.name || (subject.isPassed + '')){
		res.status(400);
		res.json({
			"error" : " Bad Date"
		});

	}else{
		db.subjects.save(subject,function(err,subject){
			if(err){
				res.send(err);
			}
			res.json(subject);
		});
	}
});

// Delete Subject
router.delete('/subject/:id',function(req,res,next){
	db.subjects.remove({_id:mongojs.ObjectId(req.params.id)},function(err,subject){
		if(err){
			res.send(err);

		}
		res.json(subject);
	});
});

// Update Subject

router.put('/subject/:id',function(req,res,next){
	var subject = req.body;
	var updSubject = {};

	if(subject.isPassed){
		updSubject.isPassed = subject.isPassed;
	}

	if(subject.name){
		updSubject.name = subject.name;
	}

	if(!updSubject){
		res.status(400);
		res.json({
			"error" : " Bad Date"
		});
	}else{
		db.subjects.update({_id:mongojs.ObjectId(req.params.id)},updSubject,{},function(err,subject){
		if(err){
			res.send(err);

		}
		res.json(subject);
	});
	}


	
});

module.exports = router;