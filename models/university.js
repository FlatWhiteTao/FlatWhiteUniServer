const mongoose = require('mongoose');
const Schema = mongoose.Schema;



//Create university Schema & model

const universitySchema = new Schema({
	
	name:{
		type:String,
		required:[true,'Name filed is required'],
		unique:true
	},
	city:{
		type:String
	},
	uniBadgeId:{
		type:String
	},
	geopoint:{
		    
			lat: { type : Number, min:-180, max:180},
			lng: { type : Number, min:-180, max:180}
	}
});

const University = mongoose.model('university',universitySchema);

module.exports = University;