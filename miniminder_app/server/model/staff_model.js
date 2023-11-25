const mongoose = require('mongoose');

var staffschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        required: false,
    },
    position: {
        type: String,
        required: false,
    },
    birthday: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    },
    status: {
        type: String,
    }
});


const Staffdb = mongoose.model('Staffdb', staffschema);
module.exports = Staffdb;