var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var roomSchema = new Schema({
    floor: { type: String, required: [true, 'the floor is necessary'] },
    number: { type: Number, unique: true, required: [true, 'the number is necessary'] },
    category: { type: Schema.Types.ObjectId, ref: 'Roomcategory', required: [true, 'the category is necessary'] },
    img: { type: String }
}, { collection: 'rooms' });
roomSchema.plugin(uniqueValidator, { message: 'the {PATH} must be unique' });
module.exports = mongoose.model('Room', roomSchema);