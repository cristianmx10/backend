var express = require('express');
var app = express();
var User = require('../models/user');
//list users
app.get('/', (req, res) => {
    User.find({})
        .exec(
            (err, users) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Failed to loanding users',
                        err
                    });
                }
                res.status(200).json({
                    ok: true,
                    users
                });
            });
});
//create user
app.post('/', (req, res) => {
    var body = req.body;
    var user = new User({
        name: body.name,
        lastname: body.lastname,
        typedoc: body.typedoc,
        numdoc: body.numdoc,
        address: body.address,
        phone: body.phone,
        email: body.email
    });
    user.save((err, userSave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to create user',
                err
            });
        }
        res.status(201).json({
            ok: true,
            userSave
        });
    });
});
//update user
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    User.findById(id, (err, user) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to search user',
                err
            });
        }
        if (!user) {
            return res.status(400).json({
                ok: false,
                message: 'the id: ' + id + 'does not exist'
            });
        }
        user.name = body.name;
        user.lastname = body.lastname;
        user.typedoc = body.typedoc;
        user.numdoc = body.numdoc;
        user.address = body.address;
        user.phone = body.phone;
        user.email = body.email;

        user.save((err, userSave) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    message: 'Failed to update user',
                    err
                });
            }
            res.status(200).json({
                ok: true,
                userSave
            });
        });
    });
});
//delete user
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    User.findByIdAndDelete(id, (err, userDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to delete user',
                err
            });
        }
        if (!userDelete) {
            return res.status(400).json({
                ok: false,
                message: 'There is no user'
            });
        }
        res.status(200).json({
            ok: true,
            userDelete
        });
    });
});
module.exports = app;