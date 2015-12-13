var mongoose = require('mongoose');
var Schema = mongoose.Schema;

module.exports = mongoose.model('Note', new Schema({
	user_id: String,
	event_type_id: String,
	text: String,
	date: String
}));