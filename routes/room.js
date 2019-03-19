var express = require('express');
var app = express();
var Room = require('../models/room');
//list rooms
app.get('/', (req, res) => {
    var since = req.query.since || 0;
    since = Number(since);
    Room.find({})
        .skip(since)
        .limit(30)
        .populate('category')
        .exec(
            (err, rooms) => {
                if (err) {
                    return res.status(500).json({
                        ok: true,
                        message: 'Failed to loanding rooms',
                        err
                    });
                }
                Room.count({}, (err, counting) => {
                    res.status(200).json({
                        ok: true,
                        rooms,
                        counting
                    });
                });
            }
        )
});
//create room
app.post('/', (req, res) => {
    var body = req.body;
    var room = new Room({
        floor: body.floor,
        number: body.number,
        category: body.category
    });
    room.save((err, roomSave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to create room',
                err
            });
        }
        res.status(201).json({
            ok: true,
            roomSave
        });
    })
});
//update room
app.put('/:id', (req, res) => {
        var id = req.params.id;
        var body = req.body;
        Room.findById(id, (err, room) => {
            if (err) {
                return res.status(500).json({
                    ok: false,
                    message: 'Failed to search room',
                    err
                })
            }
            if (!room) {
                return res.status(400).json({
                    ok: false,
                    message: 'the id: ' + id + ' does not exist'
                });
            }
            room.floor = body.floor;
            room.number = body.number;
            room.category = body.category
            room.save((err, roomSave) => {
                if (err) {
                    return res.status(400).json({
                        ok: false,
                        message: 'Failed to update room',
                        err
                    })
                }
                res.status(200).json({
                    ok: true,
                    roomSave
                });
            });
        });
    })
    //delete room
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Room.findByIdAndDelete(id, (err, roomDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to delete room',
                err
            });
        }
        if (!roomDelete) {
            return res.status(400).json({
                ok: false,
                message: 'There is no room'
            });
        }
        res.status(200).json({
            ok: true,
            roomDelete
        });
    });
});
module.exports = app;