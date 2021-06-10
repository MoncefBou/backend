const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/trippy_basics", (err) => {
    if (err) {
        console.error('Error !!!', err);
    } else {
        console.log('Connected !');
    }
})

const hotelSchema = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: { type: Number, min: 1, max: 5 },
    hasSpa: Boolean,
    hasPool: Boolean,
    priceCategory: { type: Number, min: 1, max: 3 }
})

const Hotel = mongoose.model('Hotel', hotelSchema)


const restaurantSchema = mongoose.Schema({
    name: String,
    address: String,
    city: String,
    country: String,
    stars: { type: Number, min: 1, max: 5 },
    cuisine: String,
    priceCategory: { type: Number, min: 1, max: 3 }
})

const Restaurant = mongoose.model('Restaurant', restaurantSchema)

async function s(){

    await Hotel.findOneAndDelete({_id: "60c0df86e76abc8f4f6b42f2"})
    console.log('cfait !!!!!');
}
s()