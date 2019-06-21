const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const User = require('../models/user.model');
const app = express();

const { checkToken, checkAdmin } = require('../middlewares/auth.middleware');

app.get('/user', checkToken, (req, res) => {
    let from = Number(req.query.from) || 0;
    let limit = Number(req.query.limit) || 5;

    // Los campos entre comillas son los que aparecerán en el retorno de la petición
    User.find({ status: true }, 'name email role status google img')
        .skip(from)
        .limit(limit)
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    error: err
                });
            }

            User.count({ status: true }, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    count
                });
            });
        });
});

// Cuando se ejecutan los middleware en el body se encuentran los elementos que se reciben
app.post('/user', [checkToken, checkAdmin], (req, res) => {
    let body = req.body;
    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role
    });

    user.save((err, userdb) => {
        if (err) {
            return res.status(400)
                .json({
                    ok: false,
                    error: err
                });
        }

        res.json({
            ok: true,
            user: userdb
        });
    });
});

app.put('/user/:id', [checkToken, checkAdmin], (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['name', 'email', 'img', 'role', 'status']);

    User.findByIdAndUpdate(id, body, { new: true, runValidators: true }, (err, userdb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        res.json({
            ok: true,
            user: userdb
        });
    });
});

app.delete('/user/:id', [checkToken, checkAdmin], (req, res) => {
    let id = req.params.id;

    // Con esta instrucción se elimina el registro de la db
    // User.findByIdAndUpdate(id, (err, userdb) => {});
    User.findByIdAndUpdate(id, { status: false }, { new: true }, (err, userdb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        if (userdb === null) {
            return res.status(400).json({
                ok: false,
                error: {
                    message: 'User does not exists in database.'
                }
            });
        }

        res.json({
            ok: true,
            user: userdb
        });
    });
});

module.exports = app;