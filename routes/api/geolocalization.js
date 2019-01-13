const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', (req, res, next) => {
    const ip = req._remoteAddress;
    request('http://free.ipwhois.io/json/' + ip, {json: true}, (err, response, body) => {
        if (err) {
            return res.sendStatus(400);
        }

        return res.json({
            country: body.country,
            city: body.city
        });
    });
});

module.exports = router;