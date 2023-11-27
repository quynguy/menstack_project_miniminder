const mongoose = require('mongoose');

const childschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
        required: true,
    },
    parents: {
        type: String,
        required: false,
    },
    number: {
        type: String,
        // required: false,
    },
    teacher: {
        type: String,
        // required: false,
    },
    gender: {
        type: String,
    },
});


const ChildDB = mongoose.model('ChildDB', childschema);
module.exports = ChildDB;