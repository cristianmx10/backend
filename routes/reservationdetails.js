var express = require('express');
var app = express();
var DetailsReservation = require('../models/reservationdetails');
//List details
app.get('/', (req, res) => {
    var since = req.query.since || 0;
    since = Number(since);
    DetailsReservation.find({})
        .skip(since)
        .limit(30)
        .populate('client room')
        .exec(
            (err, details) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Failed to loanding details',
                        err
                    });
                }
                DetailsReservation.count({}, (err, counting) => {
                    res.status(200).json({
                        ok: true,
                        details,
                        counting
                    });
                });
            }
        )
});
//create detail
app.post('', (req, res) => {
    var body = req.body;
    var detailreser = new DetailsReservation({
        datestart: body.datestart,
        dateend: body.dateend,
        adults: body.adults,
        children: body.children,
        client: body.client,
        room: body.room
    });
    detailreser.save((err, detailSave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to create detail',
                err
            });
        }
        res.status(201).json({
            ok: true,
            detailSave
        });
    });
});
//update
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    DetailsReservation.findByIdAndUpdate(id, body, (err, detailres) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to update detail',
                err
            });
        }
        if (!detailres) {
            return res.status(400).json({
                ok: false,
                message: 'The id: ' + id + ' does not exist'
            });
        }
        res.status(200).json({
            ok: true,
            message: 'update',
            body
        });
    });
});
//delete
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    DetailsReservation.findByIdAndDelete(id, (err, detailresDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to delete',
                err
            });
        }
        if (!detailresDelete) {
            return res.status(400).json({
                ok: false,
                message: 'There is no detail'
            });
        }
        res.status(200).json({
            ok: true,
            detailresDelete
        });
    });
});
module.exports = app;