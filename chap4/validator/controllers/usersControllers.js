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



const sendUserByUsername = async (req, res) => {
    try {

        const usernameReceived = req.params.value;

        console.log(usernameReceived);

        const userFound = await User.findOne({ username: usernameReceived }).populate('city', 'name -_id')

        res.json(userFound)

    } catch (error) {
        res.status(500).json({ errorMessage: "There was a problem !!!" })
    }
}

const sendUserByEmail = async (req, res, next) => {
    try {
        const value = req.params.value
        const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!(regex.test(value))) {
            next()
        } else {

            const findWithEmail = await User.findOne({ email: value }).populate('city', 'name -_id')

            if (!findWithEmail) {
                res.json({ message: "this email doesn't exist" })
            }

            res.json(findWithEmail)
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "There was a problem !!!" })
    }
}

const sendUserById = async (req, res, next) => {
    try {
        const value = req.params.value

        const foundId = await User.findById(value).populate('city', 'name -_id')



        if (!foundId) {
            next()
        }

        res.json(foundId)
    } catch (error) {
        console.log('yooooo')
        res.status(500).json({ errorMessage: "There was a problem !!!" })

    }
}

module.exports = { addUser, sendUserByUsername, sendUserByEmail, sendUserById }