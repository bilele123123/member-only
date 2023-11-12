const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {type: String, unique: true}, 
    password: String,
    code: String,
    role: { type: String, default: 'user' },
}, {timestamps: true});

const User = mongoose.model('User', UserSchema);
module.exports = User;