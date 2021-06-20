const expressValidator = require("express-validator");
const User = require("../models/user");
const City = require('../models/city')

const addUser = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req);
        const profilUser = req.body

        if (!errors.isEmpty()) {
            res.status(400).json({ message: "There was a problem with your form, please correct this" });
        } else {

            const cityFound = await City.findOne({ name: profilUser.city })
            profilUser.city = cityFound

            await User.create(profilUser)
            res.json({ message: 'User added' })
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "There was a problem !!!" })
    }
}

const sendUserByEmail = async (req, res, next) => {
    try {
        const value = req.params.value
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(regex.test(value))) {
            return next()
        } else {

            const findWithEmail = await User.findOne({ email: value }).populate('city', 'name -_id').lean()

            if (!findWithEmail) {
                return res.json({ message: "this email doesn't exist" })
            }
            return res.json(findWithEmail)
        }
    } catch (error) {
        return res.status(500).json({ errorMessage: "There was a problem !!!" })
    }
}

const sendUserById = async (req, res, next) => {
    try {
        const value = req.params.value
        const regex = /^[0-9a-fA-F]{24}$/
        if (regex.test(value)) {

            const foundId = await User.findById(value).populate('city', 'name -_id').lean()

            if (!foundId) {
                return next()
            }
            return res.json(foundId)
        }
        return next()
    } catch (error) {
        return res.status(500).json({ errorMessage: "There was a problem !!!" })
    }
}

const sendUserByUsername = async (req, res) => {
    try {
        const usernameReceived = req.params.value;

        const userFounds = await User.findOne({ username: usernameReceived }).populate('city', 'name -_id')

        if (!userFounds) {
            return res.json({ message: "the username or id doesn't exist sorry !" })
        }
        return res.json(userFounds)
    } catch (error) {
        return res.status(500).json({ errorMessage: "There was a problem !!!" })
    }
}

module.exports = { addUser, sendUserByUsername, sendUserByEmail, sendUserById }