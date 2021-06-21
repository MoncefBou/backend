const debug = (req, res, next) => {
    console.log("Server request")
    next()
}

const transformName = (req, res, next) => {
    req.body.name = req.body.name.toLowerCase()
    next()
}

const isNameHeroValid = (req, res, next) => {
    const name = req.params.name.toLowerCase()

    const nameFound = superHeros.find(hero => {
        return name.split(" ").join("") === hero.name.split(" ").join("").toLowerCase()
    })

    if (nameFound) {
        next()
    } else {
        res.json({ message: "Le héros n'existe pas dans la base de donnée" })
    }
}

const isPowerHeroValid = (req, res, next) => {
    const name = req.params.name.toLowerCase()
    const power = req.params.power.toLowerCase()

    const nameFound = superHeros.find(hero => {
        return name.split(" ").join("") === hero.name.split(" ").join("").toLowerCase()
    })

    const indexOfNameFound = superHeros.indexOf(nameFound)


    const powerFound = superHeros[indexOfNameFound].power.find(power => {
        return power.split(" ").join("") === power.split(" ").join("").toLowerCase()
    })

    if (powerFound) {
        next()
    } else {
        res.json({ message: "Le héros n'a pas ce pouvoir !" })
    }
}

const validateHero = (req, res, next) => {
    const dataReceived = req.body

    const keyOfDataReceived = Object.keys(dataReceived)

    const keyFound = keyOfDataReceived.filter(elem => {

        return superHeros[0][elem] === undefined
    })

    if (keyFound.length) {
        res.json({ message: "Une ou plusieurs de tes keys n'existe pas" })
    } else {
        next()
    }
}

module.exports = { debug, transformName, isNameHeroValid, isPowerHeroValid, validateHero }