const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    } else {
        return res.render('register', {
            title: 'Register',
            headerDescription: 'To create your new account just fill form below.'
        });
    }
});

module.exports = router