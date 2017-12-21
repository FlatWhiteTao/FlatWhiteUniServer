const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create school Schema & model

const schoolSchema = new Schema({
	
	name:{
		type:String,
		required:[true,'School Name filed is required'],
		unique:true
	},
	universityName:{
		type:String,
		required:[true,'University name filed is required']
	},
	universityId:{
		type:String,
		required:[true,'University id filed is required']
	}
});

const School = mongoose.model('school',schoolSchema);

module.exports = School;