const express = require('express')
const router = express.Router()

const { getRestaurants, getRestaurantById, addRestaurant } = require('../controllers/restaurantControllers')


router.get("/", getRestaurants)

router.get("/:id", getRestaurantById)

router.post("/", addRestaurant)

router.put("/:id", async (req, res) => {
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

router.delete("/:id", async (req, res) => {
    try {
        let idReceived = req.params.id

        await Restaurant.findByIdAndDelete(idReceived)
        res.json({ message: 'Restaurant deleted' })
    } catch (error) {
        console.error('Error DELETE / restaurants / :id !!!', error);
        res.json({ message: "Error DELETE / restaurants / :id sorry !!!" })
    }
})

module.exports = { restaurantRoutes : router }