const mongoose = require('mongoose');

const roomSchema = mongoose.Schema({
    people: Number,
    price: Number,
    hasBathroom: Boolean
})

const Room = mongoose.model('Room', roomSchema)

module.exports = Room