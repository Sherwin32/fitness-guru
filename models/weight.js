var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WeightSchema = new Schema({
	id: String,
	time: String,
	weight: String
});

var Weight = mongoose.model('Weight', WeightSchema);

module.exports = Weight;