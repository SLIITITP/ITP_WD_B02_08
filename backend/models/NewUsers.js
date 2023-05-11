const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    grades: {
        type: [String],
        required: true
    },
    whatsappNumber: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    registered: {
        type: Boolean,
        default: false
    }
});

const NewUser = mongoose.model('NewUser', userSchema);

module.exports = NewUser;
