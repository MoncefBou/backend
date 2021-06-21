const Heros = require('../models/heros')


const sendAllHeros =  async (req, res) => {
    try {
        const superHeros = await Heros.find()
        res.json(superHeros)
    } catch (error) {
        console.error('Error GET / heroes !!!', error);
        res.json({ message: "Error GET / heroes sorry !!!" })
    }
}

const addHeros = async (req, res) => {
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

}

const sendHeroByName = async (req, res) => {
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

}

const deleteHeros = async (req, res) => {
    try {
        const nameToDelete = req.params.name.toLowerCase()

        const deleteHeros = await Heros.findOneAndDelete({ name: nameToDelete })

        res.json({ message: `${nameToDelete} effacé correctement` })

    } catch (error) {
        console.error('Error DELETE / heroes / :name', error);
        res.json({ message: 'Error with database sorry' })
    }

}

const updateHeros = async (req, res) => {
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
}

const sendPowersByName = async (req, res) => {
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
}

const addPowers = async (req, res) => {
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
}

const deletePowers = async (req, res) => {
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
}

module.exports = {
    sendAllHeros,
    addHeros,
    sendHeroByName,
    deleteHeros,
    updateHeros,
    sendPowersByName,
    addPowers,
    deletePowers
    
}