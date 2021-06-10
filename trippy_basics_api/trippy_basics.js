const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

const Table = require('./model/table');
const Room = require('./model/room');
const Hotel = require('./model/hotel');
const Restaurant = require('./model/restaurant');


mongoose.connect("mongodb://localhost:27017/trippy_basics", (err) => {
    if (err) {
        console.error('Error !!!', err);
    } else {
        console.log('Connected !');
    }
})

app.use(express.json())
app.use(cors())


app.get("/hotels", async (req, res) => {
    try {
        const limit = parseInt(req.query.limit)
        const page = parseInt(req.query.page)

        if (limit) {
            if (page) {
                const startIndex = (page - 1) * limit

                const hotelsToShow = await Hotel.find().skip(startIndex).limit(limit)

                res.json(hotelsToShow)
            } else {
                const hotelsToShow = await Hotel.find().limit(limit)

                res.json(hotelsToShow)
            }

        } else {
            const allHotels = await Hotel.find()
            res.json(allHotels)
        }
    } catch (error) {
        console.error('Error GET / hotels !!!', error);
        res.json({ message: "Error GET / hotels sorry !!!" })
    }
})

app.get("/hotels/:id", async (req, res) => {
    try {
        const newId = req.params.id

        const hotelById = await Hotel.findById(newId).populate("rooms")
        res.json(hotelById)

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


app.get("/restaurants", async (req, res) => {
    try {

        const limit = parseInt(req.query.limit)
        const page = parseInt(req.query.page)

        if (limit) {
            if (page) {
                const startIndex = (page - 1) * limit

                const restaurantsToShow = await Restaurant.find().skip(startIndex).limit(limit)

                res.json(restaurantsToShow)
            } else {
                const restaurantsToShow = await Restaurant.find().limit(limit)

                res.json(restaurantsToShow)
            }

        } else {
            const allRestaurants = await Restaurant.find()
            res.json(allRestaurants)
        }

    } catch (error) {
        console.error('Error GET / restaurants !!!', error);
        res.json({ message: "Error GET / restaurants sorry !!!" })
    }
})

app.get("/restaurants/:id", async (req, res) => {
    try {
        const newId = req.params.id

        const restaurantById = await Restaurant.findById(newId).populate("tables")
        res.json(restaurantById)

    } catch (error) {
        console.error('Error GET / restaurants / :id !!!', error);
        res.json({ message: "Error GET / restaurants / :id sorry !!!" })
    }
})

app.post("/restaurants", async (req, res) => {
    try {
        let restaurantToAdd = req.body

        await Restaurant.create(restaurantToAdd)
        res.json({ message: "Restaurant added !" })

    } catch (error) {
        console.error('Error POST / restaurants !!!', error);
        res.json({ message: "Error POST / restaurants sorry !!!" })
    }
})

app.put("/restaurants/:id", async (req, res) => {
    try {
        let idReceived = req.params.id
        let newName = req.query.name

        await Restaurant.findByIdAndUpdate(idReceived, { name: newName })
        res.json({ message: 'Name changed !!!' })
    } catch (error) {
        console.error('Error PUT / restaurants / :id !!!', error);
        res.json({ message: "Error PUT / restaurants / :id sorry !!!" })
    }

})

app.delete("/restaurants/:id", async (req, res) => {
    try {
        let idReceived = req.params.id

        await Restaurant.findByIdAndDelete(idReceived)
        res.json({ message: 'Restaurant deleted' })
    } catch (error) {
        console.error('Error DELETE / restaurants / :id !!!', error);
        res.json({ message: "Error DELETE / restaurants / :id sorry !!!" })
    }
})

// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))