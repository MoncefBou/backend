const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, require: true},
    email: {type: String, require: true},
    age: Number,
    city: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
