var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        res.render('login', {
            title: 'Login',
            headerDescription: 'To continue provide your credentials.'
        })
    }
});

module.exports = router