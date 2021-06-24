const Hotel = require('../models/hotel');
const Room = require('../models/room');

const getHotels = async (req, res) => {
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
}

const getHotelById = async (req, res) => {
    try {
        const newId = req.params.id

        const hotelById = await Hotel.findById(newId).populate("rooms")
        res.json(hotelById)

    } catch (error) {
        console.error('Error GET / hotels / :id !!!', error);
        res.json({ message: "Error GET / hotels / :id sorry !!!" })
    }
}

const postHotel = async (req, res) => {
    try {
        let hotelToAdd = req.body

        await Hotel.create(hotelToAdd)
        res.json({ message: "Hotel added !" })

    } catch (error) {
        console.error('Error POST / hotels !!!', error);
        res.json({ message: "Error POST / hotels sorry !!!" })
    }
}

const updateHotel = async (req, res) => {
    try {
        let idReceived = req.params.id
        let newName = req.query.name

        await Hotel.findByIdAndUpdate(idReceived, { name: newName })
        res.json({ message: 'Name changed !!!' })
    } catch (error) {
        console.error('Error PUT / hotels / :id !!!', error);
        res.json({ message: "Error PUT / hotels / :id sorry !!!" })
    }

}

const removeHotel = async (req, res) => {
    try {
        let idReceived = req.params.id

        await Hotel.findByIdAndDelete(idReceived)
        res.json({ message: 'Hotel deleted' })
    } catch (error) {
        console.error('Error DELETE / hotels / :id !!!', error);
        res.json({ message: "Error DELETE / hotels / :id sorry !!!" })
    }
}

module.exports = { getHotels, getHotelById, postHotel, updateHotel, removeHotel }