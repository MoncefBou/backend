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
            
            const cityFound = await City.findOne({city : profilUser.city})
            profilUser.city = cityFound
            
            console.log('profilUser :', profilUser);
            // await User.create()

            
            res.json({message : 'OKKKK !!!'})
        }
    } catch (error) {
        res.status(500).json({ errorMessage: "There was a problem !!!" })
    }
}

module.exports = { addUser}