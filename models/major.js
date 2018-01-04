const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create major Schema & model

const majorSchema = new Schema({
	
	name:{
		type:String,
		required:[true,'Major Name filed is required']
		
	},
	schoolName:{
		type:String,
		required:[true,'School name filed is required']
	},
	schoolId:{
		type:String,
		required:[true,'School id filed is required']
	}
});

const Major = mongoose.model('major',majorSchema);

module.exports = Major;