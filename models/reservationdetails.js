var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var reservationdetailsSchema = new Schema({
    datestart: { type: Date, required: [true, 'the start date is necessary'] },
    dateend: { type: Date, required: [true, 'the end date is necessary'] },
    adults: { type: Number, required: true },
    children: { type: Number, required: true },
    client: { type: Schema.Types.ObjectId, ref: 'Client', required: [true, 'the client is necessary'] },
    room: { type: Schema.Types.ObjectId, ref: 'Room', required: [true, 'the room is necessary'] }
}, { collection: 'reservationdetails' });
module.exports = mongoose.model('Reservationdetails', reservationdetailsSchema);