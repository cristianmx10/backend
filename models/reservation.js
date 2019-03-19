var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reservationSchema = new Schema({
    pricetotal: { type: Number, required: [true, 'the price total is necessary'] },
    state: { type: Schema.Types.ObjectId, ref: 'State', required: true },
    receptionist: { type: Schema.Types.ObjectId, ref: 'Employee', required: true },
    detailsreservation: { type: Schema.Types.ObjectId, ref: 'Reservationdetails' },
    product: { type: Object.Types.ObjectId, ref: 'Product' },
    service: { type: Object.Types.ObjectId, ref: 'Service' }
}, );