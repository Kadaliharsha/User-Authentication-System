const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    company: {type: String, required: true},
    age: {type: Number, required: true},
    dob: {type: Date, required: true},
    profileImage: {type: String},
    otp: {
        code: String,
        expiresAt: Date
    }
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);