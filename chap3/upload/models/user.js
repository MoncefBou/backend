const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/upload")


const userSchema = mongoose.Schema({
    name: String,
    profilePicture: String,
})

const User = mongoose.model('User', userSchema)

module.exports = User