var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var roomcategorySchema = new Schema({
    name: { type: String, unique: true, uppercase: true, required: [true, 'the name is necessary'] },
    description: { type: String, required: [true, 'the description is necessary'] },
    price: { type: Number, required: [true, 'the price is necessary'] }
}, { collection: 'roomcategories' });
roomcategorySchema.plugin(uniqueValidator, { message: 'the {PATH} must be unique' });
module.exports = mongoose.model('Roomcategory', roomcategorySchema);