const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//Create university Schema & model

const universitySchema = new Schema({
	
	name:{
		type:String,
		required:[true,'Name filed is required']
	},
	city:{
		type:String
	}
});

const University = mongoose.model('university',universitySchema);

module.exports = University;