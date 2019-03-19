var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var accessValid = {
    values: ['RECEPTIONIST', 'ADMIN', 'ROOT'],
    message: '{VALUE} is not valid'
}
var loginSchema = new Schema({
    user: { type: String, unique: true, required: [true, 'the user is necessary'] },
    password: { type: String, required: [true, 'the password is necessary'] },
    access: { type: String, default: 'RECEPTIONIST', enum: accessValid, required: true },
    employee: { type: Schema.Types.ObjectId, ref: 'Employee', required: true, unique: true }
}, { collection: 'login' });
loginSchema.plugin(uniqueValidator, { message: 'the {PATH} must be unique' });
module.exports = mongoose.model('Login', loginSchema);