const mongoose = require('mongoose');

const childschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    birthday: {
        type: String,
    },
    parents: {
        type: String,
        required: true,
    },
    number: {
        type: String,
        required: true,
    },
    teacher: {
        type: String,
        required: true,
    },
    gender: {
        type: String,
    }
});



const ChildDB = mongoose.model('ChildDB', childschema);
module.exports = ChildDB;