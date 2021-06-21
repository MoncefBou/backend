const mongoose = require('mongoose');

const herosSchema = mongoose.Schema({
    name: String,
    power: Array,
    color: String,
    isAlive: Boolean,
    age: Number,
    image: String,
    created: { type: Date, default: Date.now }
})

const Heros = mongoose.model('Heros', herosSchema)

module.exports = Heros;