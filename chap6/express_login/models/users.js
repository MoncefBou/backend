const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    email : {type: String, unique: true, require: true},
    password : {type: String, require: true},
    firstname : {type: String, require: true},
    surname : {type: String, require: true},
    date_of_birth : {type: String, require: true},
    created : { type : Date, default : Date.now}
})

const User = mongoose.model('User', userSchema)

module.exports = User