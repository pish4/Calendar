var mongoose = require('mongoose');
var Schema = mongoose.Schema;


module.exports = mongoose.model('Events_type', new Schema({
	event_name: String,
	user_id: String,
}));
