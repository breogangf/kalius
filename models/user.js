const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    age: Number,
    location: String,
    role: String
})

module.exports = mongoose.model('User', UserSchema, 'users')
