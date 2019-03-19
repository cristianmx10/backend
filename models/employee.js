var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var employeeSchema = new Schema({
    salary: { type: Number, required: [true, 'the salary is necessary'] },
    description: { type: String },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: [true, 'the user is necessary'] }
}, { collection: 'employees' });

module.exports = mongoose.model('Employee', employeeSchema);