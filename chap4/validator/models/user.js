const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/validator");

const userSchema = mongoose.Schema({
    username: String,
    email: String,
    age: Number,
    city: [{ type: mongoose.Schema.Types.ObjectId, ref: 'City' }]
})

const User = mongoose.model('User', userSchema)

module.exports = User
