const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    username: String,
    profileURL: String,
    name: String,
    age: String,
    location: String,
    role: String,
    sex: { type: String, default: 'N/A' },
    createdAt: { type: Date, default: Date.now() },
    updatedAt: { type: Date, default: null },
    active: { type: Boolean, default: true }
})

module.exports = mongoose.model('User', UserSchema, 'users')
