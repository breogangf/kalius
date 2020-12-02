const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    profileURL: String,
    name: String,
    age: String,
    location: String,
    role: String,
    sex: { type: String, default: 'NA' }
})

module.exports = mongoose.model('User', UserSchema, 'users')
