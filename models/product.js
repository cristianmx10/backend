var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var Schema = mongoose.Schema;
var productSchema = new Schema({
    name: { type: String, unique: true, uppercase: true, required: [true, 'the name is necessary'] },
    description: { type: String, uppercase: true },
    stock: { type: Number, required: [true, 'the stock is necessary'] },
    price: { type: Number, required: [true, 'the price is necessary'] },
    category: { type: Schema.Types.ObjectId, ref: 'Productcategory', required: true }
}, { collection: 'products' });
productSchema.plugin(uniqueValidator, { message: 'The {PATH} must be unique' });
module.exports = mongoose.model('Product', productSchema);