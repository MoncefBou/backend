const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/avengers", (err) => {
    if (err) {
        console.error('Error !!!', err);
    } else {
        console.log('Connected !');
    }
})

const herosSchema = mongoose.Schema({
    name: String,
    power: Array,
    color: String,
    isAlive: Boolean,
    age: Number,
    image: String,
    created: { type: Date, default: Date.now }
})

const Heros = mongoose.model('Heros', herosSchema)

// const superHeros = [
//     {
//         name: "Iron Man",
//         power: ["money"],
//         color: "red",
//         isAlive: true,
//         age: 46,
//         image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
//     },
//     {
//         name: "Thor",
//         power: ["electricty", "worthy"],
//         color: "blue",
//         isAlive: true,
//         age: 300,
//         image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
//     },
//     {
//         name: "Daredevil",
//         power: ["blind"],
//         color: "red",
//         isAlive: false,
//         age: 30,
//         image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
//     }
// ]

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

app.use(express.json())
app.use(cors())
app.use(debug)


app.get("/heroes", async (req, res) => {
    try {
        const superHeros = await Heros.find()
        res.json(superHeros)
    } catch (error) {
        console.error('Error GET / heroes !!!', error);
        res.json({ message: "Error GET / heroes sorry !!!" })
    }
})

app.post("/heroes", transformName, async (req, res) => {
    try {

        let newHeros = req.body
        const superHeros = await Heros.find()
        const arrayToVerify = superHeros.filter(hero => hero.name.toLowerCase() === newHeros.name)

        if (arrayToVerify.length) {
            res.json({ message: "Cet héros existe déja !" })
        } else {

            const heroToSaved = new Heros(newHeros)

            const herosSaved = await heroToSaved.save()
            res.json({ message: "Ok, héros ajouté" })
        }

    } catch (error) {
        console.error('Error POST / heroes !!!', error);
        res.json({ message: "Error POST / heroes sorry !!!" })
    }

})

app.get("/heroes/:name", async (req, res) => {
    try {
        let nameSearch = req.params.name.toLowerCase()

        const superHeros = await Heros.findOne({ name: nameSearch })


        // const nameFound = superHeros.filter(hero => {
        //     return hero.name.split(" ").join("").toLowerCase() === name.split(" ").join("")
        // })

        if (superHeros) {
            res.json(superHeros)
        } else {
            res.json({ message: "Wrong name of heroes man !" })
        }

    } catch (error) {
        console.error('Error GET / heroes / :name !!!', error);
        res.json({ message: 'Error GET / heroes / :name sorry !!!' })
    }

})

app.delete("/heroes/:name", isNameHeroValid, async (req, res) => {
    try {
        const nameToDelete = req.params.name.toLowerCase()

        const deleteHeros = await Heros.findOneAndDelete({ name: nameToDelete })

        res.json({ message: `${nameToDelete} effacé correctement` })

    } catch (error) {
        console.error('Error DELETE / heroes / :name', error);
        res.json({ message: 'Error with database sorry' })
    }

})

app.put("/heroes/:name", isNameHeroValid, validateHero, async (req, res) => {
    try {
        const nameToUpdate = req.params.name.toLowerCase()
        const dataReceived = req.body

        const updateHeros = await Heros.updateOne({ name: "Thor" }, dataReceived)

        if (updateHeros.n) {

            res.json({ message: `Ok, les informations sur ${nameToUpdate} ont été changées` })
        } else {
            res.json({ message: `${nameToUpdate} n'existe pas dans la database !!` })

        }
    } catch (error) {
        console.error('Error PUT / heroes / :name', error);
        res.json({ message: 'Error with database sorry' })
    }

    // const keyOfDataReceived = Object.keys(dataReceived)

    // const nameFound = superHeros.find(hero => {
    //     return name.split(" ").join("") === hero.name.split(" ").join("").toLowerCase()
    // })

    // for (let i = 0; i < keyOfDataReceived.length; i++) {
    //     nameFound[keyOfDataReceived[i]] = dataReceived[keyOfDataReceived[i]]
    // }

})

app.get("/heroes/:name/powers", async (req, res) => {
    try {
        let nameToSearch = req.params.name.toLowerCase()
        const findPowerHeros = await Heros.find({ name: nameToSearch }, 'power -_id')

        if (findPowerHeros) {
            res.json(findPowerHeros[0])
        } else {
            res.json({ message: 'heros not in the database !!!' })
        }

    } catch (error) {
        console.error('Error GET / heroes / :name / powers', error);
        res.json({ message: 'Error with database sorry' })
    }


    // const nameFound = superHeros.filter(hero => {
    //     return hero.name.split(" ").join("").toLowerCase() === name.split(" ").join("")
    // })

    if (nameFound.length) {
        res.json(nameFound[0].power)
    } else {
        res.json({ message: "Wrong name of heroes man !" })
    }

})

app.post("/heroes/:name/powers", async (req, res) => {
    try {
        let nameToSearch = req.params.name.toLowerCase()
        let newPower = req.body.newPower
        const findPowerHeros = await Heros.find({ name: nameToSearch }, 'power -_id')
        console.log('findPowerheros', findPowerHeros);
        if (findPowerHeros) {
            const arrayOfPowers = findPowerHeros[0].power

            if (arrayOfPowers.indexOf(newPower) === -1) {
                arrayOfPowers.push(newPower)

                const savedPower = await Heros.updateOne({ name: nameToSearch }, { $set: { power: arrayOfPowers } })
                res.json({ message: 'pouvoir ajouté' })
            } else {
                res.json({ message: 'le pouvoir existe déjà' })
            }
        } else {
            res.json({ message: 'heros pas trouvé' })
        }

    } catch (error) {
        console.error('Error POST / heroes / :name / powers', error);
        res.json({ message: 'Error with database sorry' })
    }
})

app.delete("/heroes/:name/power/:power", isNameHeroValid, isPowerHeroValid, async (req, res) => {
try {
    const nameToSearch = req.params.name.toLowerCase()
    const power = req.params.power.toLowerCase()
    const findPowerHeros = await Heros.find({ name: nameToSearch }, 'power -_id')

    if (findPowerHeros) {
        const arrayOfPowers = findPowerHeros[0].power

        if (arrayOfPowers.indexOf(power) !== -1) {

            arrayOfPowers.splice(arrayOfPowers.indexOf(power), 1)

            const deletedPower = await Heros.updateOne({ name: nameToSearch }, { $set: { power: arrayOfPowers } })
            res.json({ message: 'pouvoir supprimé' })

        } else {
            res.json({ message: 'pouvoir pas trouvé' })
        }


    } else {
        res.json({ message: 'heros pas trouvé' })
    }
} catch (error) {
    console.error('Error DELETE / heroes / :name / powers', error);
    res.json({ message: 'Error with database sorry' })
}


const nameFound = superHeros.find(hero => {
        return name.split(" ").join("") === hero.name.split(" ").join("").toLowerCase()
    })

    const indexOfNameFound = superHeros.indexOf(nameFound)

    const powerFound = superHeros[indexOfNameFound].power.find(eachPower => {
        return power.split(" ").join("") === eachPower.split(" ").join("").toLowerCase()
    })

    const indexOfPowerFound = superHeros[indexOfNameFound].power.indexOf(powerFound)

    superHeros[indexOfNameFound].power.splice(indexOfPowerFound, 1)

    res.json({ message: `Le pouvoir ${powerFound} de ${nameFound.name} a été effacé correctement` })
})


// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))

// --experimental-json-modules