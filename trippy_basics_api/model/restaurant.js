const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/trippy_basics")

const restaurantSchema = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: { type: Number, min: 1, max: 5 },
    cuisine: String,
    priceCategory: { type: Number, min: 1, max: 3 },
    tables: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Table' }]
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

module.exports = Restaurant