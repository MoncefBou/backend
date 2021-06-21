const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const Heros = require('./models/heros');
mongoose.connect("mongodb://localhost:27017/avengers",  { useNewUrlParser: true, useUnifiedTopology: true })


const heroesRoutes = require ('./routes/heroesRoutes')
const { debug } = require('./middlewares/heroesMiddlewares')


app.use(express.json())
app.use(cors())
app.use(debug)


app.use("/heroes", heroesRoutes)



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