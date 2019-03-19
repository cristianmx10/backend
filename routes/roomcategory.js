var express = require('express');
var app = express();
var RoomCategory = require('../models/roomcategory');
//list categories
app.get('/', (req, res) => {
    var since = req.query.since || 0;
    since = Number(since);
    RoomCategory.find({})
        .skip(since)
        .limit(30)
        .exec(
            (err, categoriesrooms) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Failed to loanding categories rooms',
                        err
                    });
                }
                RoomCategory.count({}, (err, counting) => {
                    res.status(200).json({
                        ok: true,
                        categoriesrooms,
                        counting
                    });
                })
            }
        )
});
//create category room
app.post('/', (req, res) => {
    var body = req.body;
    var roomcategory = new RoomCategory({
        name: body.name,
        description: body.description,
        price: body.price
    });
    roomcategory.save((err, roomcategorySave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to create category of room',
                err
            });
        }
        res.status(201).json({
            ok: true,
            roomcategorySave
        });
    });
});
//update category
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    RoomCategory.findById(id, (err, roomcategory) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to search category room',
                err
            })
        }
        if (!roomcategory) {
            return res.status(400).json({
                ok: false,
                message: 'the id: ' + id + 'does not exist'
            });
        }
        roomcategory.name = body.name;
        roomcategory.description = body.description;
        roomcategory.price = body.price;

        roomcategory.save((err, roomcategoryupdate) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Failed to update category room',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                roomcategoryupdate
            });
        });
    });
});
//delete category
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    RoomCategory.findByIdAndDelete(id, (err, roomcategoryDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to delete category of romm',
                err
            });
        }
        if (!roomcategoryDelete) {
            return res.status(400).json({
                ok: false,
                message: 'There is no category of room'
            });
        }
        res.status(200).json({
            ok: true,
            roomcategoryDelete
        });
    })
});
module.exports = app;