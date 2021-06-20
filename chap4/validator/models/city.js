const mongoose = require('mongoose');

const citySchema = mongoose.Schema({
    name: String,
})

const City = mongoose.model('City', citySchema)

module.exports = City

const Addcity = () => {
    City.insertMany([ 
        { name: "Paris" },
        { name: "Los Angeles" },
        { name: "Tokyo" }])
}

Addcity()