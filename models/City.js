const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        minlength: 2
    },
    userId: {
        type: Number
    }
});

module.exports = mongoose.model('City', citySchema);