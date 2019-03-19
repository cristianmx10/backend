var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var stateSchema = new Schema({
    name: { type: String, unique: true, uppercase: true, required: [true, 'the name is necessary'] },
    description: { type: String, required: true }
}, { collection: 'state' });
stateSchema.plugin(uniqueValidator, { message: 'the {PATH} must be unique' });
module.exports = mongoose.model('State', stateSchema);