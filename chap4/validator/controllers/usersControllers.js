const expressValidator = require("express-validator");
const User = require("../models/user");
const City = require('../models/city')

const addUser = async (req, res) => {
    try {
        const errors = expressValidator.validationResult(req);
        const profilUser = req.body

        if (!errors.isEmpty()) {
            res.status(400).json({message : "There was a problem with your form, please correct this"});
        } else {
            
            const cityFound = await City.findOne({name : profilUser.city})
            profilUser.city = cityFound

            await User.create(profilUser)
            res.json({message : 'User added'})
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "There was a problem !!!" })
    }
}

const sendUserByUsername = async (req, res) => {
    try {
        const usernameReceived = req.params.username;

        const userFound = await User.findOne({username : usernameReceived }).populate('city', 'name -_id')

        res.json(userFound)

    } catch (error) {
        res.status(500).json({ errorMessage: "There was a problem !!!" })
    }
}

const sendUserByEmail = async (req, res) => {
    try {
        res.json({message : 'wewee !!'})
    } catch (error) {
        res.status(500).json({ errorMessage: "There was a problem !!!" })
    }

}
module.exports = { addUser, sendUserByUsername, sendUserByEmail}