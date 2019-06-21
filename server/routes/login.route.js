const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const app = express();

app.post('/login', (req, res) => {
    let body = req.body;
    User.findOne({ email: body.email }, (err, userdb) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                error: err
            });
        }

        if (!userdb) {
            return res.status(500).json({
                ok: false,
                error: {
                    message: 'The email does not exist in database.'
                }
            });
        }

        if (!bcrypt.compareSync(body.password, userdb.password)) {
            return res.status(500).json({
                ok: false,
                error: {
                    message: 'The typed password is incorrect.'
                }
            });
        }

        let token = jwt.sign({
            user: userdb
        }, process.env.AUTH_SEED, { expiresIn: process.env.EXPIRE_TOKEN });

        return res.json({
            ok: true,
            user: userdb,
            token
        });
    });
});

module.exports = app;