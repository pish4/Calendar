var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// set up a mongoose model and pass it using models.exports
module.exports = mongoose.model('User', new Schema({
    firstName: String,
    lastName: String,
    city: String,
    phone: String
}));