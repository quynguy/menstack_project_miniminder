const mongoose = require('mongoose');

var staffschema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    number: {
        type: Number,
        required: true,
    },
    position: {
        type: String,
        required: true
    },
    birthday: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
    },
    status: {
        type: String,
    }
});


const Staffdb = mongoose.model('staffdb', staffschema);
module.exports = Staffdb;