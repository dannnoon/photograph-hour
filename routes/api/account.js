const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');
const utils = require('../../utils');

const Account = mongoose.model('Account');

router.get('/', function (req, res, next) {
    try {
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
                    return res.sendStatus(404)
                }
                console.log('Inside req.login() callback');
                console.log(`req.session.passport: ${JSON.stringify(req.session.passport)}`);
                console.log(`req.user: ${JSON.stringify(userRequest)}`);
                utils.navigate("search");
                return res.sendStatus(200)
            })
        })(req, res, next);
    } catch (e) {
        return res.sendStatus(400)
    }
});

router.post('/', function (req, res, next) {
    try {
        const account = new Account(req.body);

        account.save()
            .then(() => {
                return res.sendStatus(200);
            })
            .catch((reason) => {
                return res.sendStatus(400)
            })
    } catch (e) {
        return res.sendStatus(400)
    }
});

module.exports = router;
