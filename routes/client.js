var express = require('express');
var app = express();
var Client = require('../models/client');
//list clients
app.get('/', (req, res) => {
    var since = req.query.since || 0;
    since = Number(since);
    Client.find({})
        .skip(since)
        .limit(30)
        .populate('user')
        .exec(
            (err, clients) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Failed to loanding clients',
                        err
                    });
                }
                Client.count({}, (err, counting) => {
                    res.status(200).json({
                        ok: true,
                        clients,
                        counting
                    });
                })
            }
        )
});
//create client
app.post('/', (req, res) => {
    var body = req.body;
    var client = new Client({
        observation: body.observation,
        user: body.user
    });
    client.save((err, clientSave) => {
        if (err) {
            return res.status(400).json({
                ok: true,
                message: 'Failed to create client',
                err
            });
        }
        res.status(201).json({
            ok: true,
            clientSave
        });
    });
});
//update cliente
app.put('/:id', (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Client.findByIdAndUpdate(id, body, (err, clientUpdate) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to update client'
            });
        }
        if (!clientUpdate) {
            return res.status(400).json({
                ok: false,
                message: 'The id: ' + id + ' does not exist'
            });
        }
        res.status(200).json({
            ok: true,
            body
        });
    })
});
//delete client
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Client.findByIdAndDelete(id, (err, clientDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to delete client',
                err
            });
        }
        if (!clientDelete) {
            return res.status(400).json({
                ok: false,
                message: 'There is no client'
            });
        }
        res.status(200).json({
            ok: true,
            clientDelete
        });
    });
});
module.exports = app;