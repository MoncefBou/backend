const express = require('express')
const router = express.Router()

const { getHotels, getHotelById, postHotel, updateHotel, removeHotel } = require('../controllers/hotelControllers')


router.get("/", getHotels)

router.get("/:id", getHotelById)

router.post("/", postHotel)

router.put("/:id", updateHotel)

router.delete("/:id", removeHotel)

module.exports = {hotelRoutes : router}