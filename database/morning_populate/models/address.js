const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/morning_populate")


const addressSchema = mongoose.Schema({
    streetName: String,
    streetNumber: String,
    postCode: String,
    city: String
})

const Address = mongoose.model('Address', addressSchema)

module.exports = Address