const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');

const Account = mongoose.model('Account');

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.sendStatus(400);
    }

    let userRequest = {
        username: req.query.username,
        password: req.query.password
    };
    req.user = userRequest;

    passport.authenticate('local', (err, user, info) => {
        console.log('Inside passport.authenticate() callback');
        console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
        console.log(`req.user: ${JSON.stringify(userRequest)}`);
        req.login(user, (err) => {
            if (err) {
                console.log('inside login error');
                return res.sendStatus(404);
            }
            console.log('Inside req.login() callback');
            console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
            console.log(`req.user: ${JSON.stringify(userRequest)}`);
            return res.json({message: "Logged in successfully."});
        })
    })(req, res, next);
});

router.post('/', function (req, res, next) {
    try {
        const account = new Account(req.body);

        account.save()
            .then(() => {
                return res.json({message: "Registered successfully."});
            })
            .catch((reason) => {
                return res.sendStatus(400);
            })
    } catch (e) {
        return res.sendStatus(400);
    }
});

router.get('/logout', (req, res, next) => {
    if (req.isAuthenticated()) {
        req.logout();
        return res.json({message: "Success logout."});
    }

    res.sendStatus(401);
});

module.exports = router;
