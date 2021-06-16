const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/validator");

const citySchema = mongoose.Schema({
    name: String,
})

const City = mongoose.model('City', citySchema)

module.exports = City