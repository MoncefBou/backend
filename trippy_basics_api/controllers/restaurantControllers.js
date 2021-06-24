const Restaurant = require('../models/restaurant');
const Table = require('../models/table');

const getRestaurants = async (req, res) => {
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
}

const getRestaurantById = async (req, res) => {
    try {
        const newId = req.params.id

        const restaurantById = await Restaurant.findById(newId).populate("tables")
        res.json(restaurantById)

    } catch (error) {
        console.error('Error GET / restaurants / :id !!!', error);
        res.json({ message: "Error GET / restaurants / :id sorry !!!" })
    }
}

const addRestaurant = async (req, res) => {
    try {
        let restaurantToAdd = req.body

        await Restaurant.create(restaurantToAdd)
        res.json({ message: "Restaurant added !" })

    } catch (error) {
        console.error('Error POST / restaurants !!!', error);
        res.json({ message: "Error POST / restaurants sorry !!!" })
    }
}

module.exports = { getRestaurants, getRestaurantById, addRestaurant }