const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/trippy_basics", (err) => {
    if (err) {
        console.error('Error !!!', err);
    } else {
        console.log('Connected !');
    }
})

app.use(express.json())
app.use(cors())

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

function exempleRestoFunc() {

    try {
        const exempleResto = new Restaurant({
            name: "Resto",
            address: "Address",
            city: "Paris",
            country: "France",
            stars: 3,
            cuisine: "Indienne",
            priceCategory: 2
        })

        exempleResto.save()

    } catch (error) {
        console.error('ERROR !', error);
    }
}

function exempleHotelFunc() {
    try {
        const exempleHotel = new Hotel({
            name: "Hotel",
            address: "Address",
            city: "Paris",
            country: "France",
            stars: 3,
            hasSpa: true,
            hasPool: false,
            priceCategory: 2
        })

        exempleHotel.save();

    } catch (error) {
        console.error('ERROR !', error);
    }

}




// - Ajouter la possiblité d’effacer un hôtel (`DELETE /hotels/:id`)


app.get("/hotels", async (req, res) => {
    try {
        const allHotels = await Hotel.find()
        res.json(allHotels)

    } catch (error) {
        console.error('Error GET / hotels !!!', error);
        res.json({ message: "Error GET / hotels sorry !!!" })
    }
})

app.get("/hotels/:id", async (req, res) => {
    try {
        const newId = req.params.id

        const HotelById = await Hotel.findById(newId)
        res.json(HotelById)

    } catch (error) {
        console.error('Error GET / hotels / :id !!!', error);
        res.json({ message: "Error GET / hotels / :id sorry !!!" })
    }
})

app.post("/hotels", async (req, res) => {
    try {
        let hotelToAdd = req.body

        await Hotel.create(hotelToAdd)
        res.json({ message: "Hotel added !" })

    } catch (error) {
        console.error('Error POST / hotels !!!', error);
        res.json({ message: "Error POST / hotels sorry !!!" })
    }
})

app.put("/hotels/:id", async (req, res) => {
    try {
        let idReceived = req.params.id
        let newName = req.query.name

        await Hotel.findByIdAndUpdate(idReceived, { name: newName })
        res.json({ message: 'Name changed !!!' })
    } catch (error) {
        console.error('Error PUT / hotels / :id !!!', error);
        res.json({ message: "Error PUT / hotels / :id sorry !!!" })
    }

})

app.delete("/hotels/:id", async (req, res) => {
    try {
        let idReceived = req.params.id

        await Hotel.findByIdAndDelete(idReceived)
        res.json({ message: 'Hotel deleted' })
    } catch (error) {
        console.error('Error DELETE / hotels / :id !!!', error);
        res.json({ message: "Error DELETE / hotels / :id sorry !!!" })
    }
})

// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))