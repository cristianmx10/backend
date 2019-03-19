var express = require('express');
var app = express();
var Login = require('../models/login');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var mdAuten = require('../middlewares/autenticacion');
//login
app.post('/1', (req, res) => {
    var body = req.body;
    Login.findOne({ user: body.user }, (err, logindb) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed',
                err
            })
        }
        if (!logindb) {
            return res.status(400).json({
                ok: false,
                message: 'Failed - email',
                err
            });
        }
        if (!bcrypt.compareSync(body.password, logindb.password)) {
            return res.status(400).json({
                ok: false,
                message: 'Failed - pass',
                err
            });
        }
        //create token
        logindb.password = ':)';
        var token = jwt.sign({ login: logindb }, SEED, { expiresIn: 86400 })

        res.status(200).json({
            ok: true,
            logindb,
            id: logindb._id,
            token
        });
    });
});
//list login
app.get('/', (req, res) => {
    var since = req.query.since || 0;
    since = Number(since);
    Login.find({})
        .skip(since)
        .limit(30)
        .populate('employee')
        .exec(
            (err, logins) => {
                if (err) {
                    return res.status(500).json({
                        ok: false,
                        message: 'Failed to loanding logins',
                        err
                    });
                }
                Login.count({}, (err, counting) => {
                    res.status(200).json({
                        ok: true,
                        logins,
                        counting
                    });
                })
            }
        )
});
//update login
app.put('/:id', mdAuten.verificaToken, (req, res) => {
    var id = req.params.id;
    var body = req.body;
    Login.findByIdAndUpdate(id, body, (err, login) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to update login',
                err
            });
        }
        if (!login) {
            return res.status(400).json({
                ok: false,
                message: 'The id: ' + id + ' does not exist'
            });
        }
        res.status(200).json({
            ok: true,
            message: 'Update',
            logintoken: req.login,
            body
        });
    });
});
//create login
app.post('', (req, res) => {
    var body = req.body;
    var login = new Login({
        user: body.user,
        password: bcrypt.hashSync(body.password, 10),
        access: body.access,
        employee: body.employee
    });
    login.save((err, loginSave) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                message: 'Failed to create login',
                err
            });
        }
        res.status(201).json({
            ok: true,
            loginSave
        });
    });
});
//delete client
app.delete('/:id', (req, res) => {
    var id = req.params.id;
    Login.findByIdAndDelete(id, (err, loginDelete) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                message: 'Failed to delete login',
                err
            });
        }
        if (!loginDelete) {
            return res.status(400).json({
                ok: false,
                message: 'There is no login'
            });
        }
        res.status(200).json({
            ok: true,
            loginDelete
        });
    });
});
module.exports = app;