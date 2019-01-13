var express = require('express');
var router = express.Router();

router.get('/', function (req, res, next) {
    if (req.isAuthenticated()) {
        return res.render('search', {
            title: 'Cities',
            headerDescription: 'Here you can search for cities you have interest in.'
        });
    } else {
        res.redirect('/login');
    }
});

module.exports = router;
