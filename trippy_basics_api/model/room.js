const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/trippy_basics")

const roomSchema = mongoose.Schema({
    people: Number,
    price: Number,
    hasBathroom: Boolean
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room