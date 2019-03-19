var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var documentsvalid = {
    values: ['DNI', 'PASAPORTE'],
    message: '{value} is not valid'
}
var userSchema = new Schema({
    name: { type: String, uppercase: true, required: [true, 'the name is necessary'] },
    lastname: { type: String, uppercase: true, required: [true, 'the last name is necessaey'] },
    typedoc: { type: String, uppercase: true, required: [true, 'the type document is necessary'], enum: documentsvalid },
    numdoc: { type: Number, unique: true, required: [true, 'the document number is necessary'] },
    address: { type: String, uppercase: true, required: [true, 'the address is necessary'] },
    img: { type: String },
    phone: { type: String, required: [true, 'the cell phone is necessary'] },
    email: { type: String, uppercase: true, unique: true, required: [true, 'the email is necessary'] },
    datereg: { type: Date, required: [true, 'the registration date is necessary'], default: Date() },
    state: { type: Boolean, required: [true, 'the state is necessary'], default: true }
}, { collection: 'users' });
userSchema.plugin(uniqueValidator, { message: 'the {PATH} must be unique' });
module.exports = mongoose.model('User', userSchema);