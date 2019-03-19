var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var uniqueValidator = require('mongoose-unique-validator');
var clientSchema = new Schema({
    observation: { type: String, default: 'no observation' },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true }
}, { collection: 'customers' });
clientSchema.plugin(uniqueValidator, { message: 'the {PATH} must be unique' });
module.exports = mongoose.model('Client', clientSchema);