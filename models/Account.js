const mongoose = require('mongoose');

const accountSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        unique: true,
        minlength: 3
    },
    password: {
        type: String,
        minlength: 5
    }
});

module.exports = mongoose.model('Account', accountSchema);