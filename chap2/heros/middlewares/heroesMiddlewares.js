const Heros = require('../models/heros')

const debug = (req, res, next) => {
    console.log("Server request")
    next()
}

const transformName = (req, res, next) => {
    req.body.name = req.body.name.toLowerCase()
    next()
}

const isNameHeroValid = async (req, res, next) => {
    const nameReceived = req.params.name.toLowerCase()

    const nameFound = await Heros.findOne({ name : nameReceived })

    if (nameFound) {
        next()
    } else {
        res.json({ message: "Le héros n'existe pas dans la base de donnée" })
    }
}


module.exports = { debug, transformName, isNameHeroValid }