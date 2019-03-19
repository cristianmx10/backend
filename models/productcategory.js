var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var productcategorySchema = new Schema({
    name: { type: String, unique: true, uppercase: true, required: [true, 'the name is necessary'] },
    description: { type: String, uppercase: true, default: 'Sin categoria' }
}, { collection: 'productcategories' });
productcategorySchema.plugin(uniqueValidator, { message: 'the {PATH} must be unique' });
module.exports = mongoose.model('Productcategory', productcategorySchema);