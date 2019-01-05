var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
    let page = req.query.page;

    switch (page) {
        case "login":
            return res.render('login', {title: 'Login', headerDescription: 'To continue provide your credentials.'});

        case "register":
            return res.render('register', {
                title: 'Register',
                headerDescription: 'To create your new account just fill form below.'
            });

        case "search":
            return res.render('search', {
                title: 'Cities',
                headerDescription: 'Here you can search for cities you have interest in.'
            });

        default:
            return res.render('login', {title: 'Login', headerDescription: 'To continue provide your credentials'});
    }
});

module.exports = router;
