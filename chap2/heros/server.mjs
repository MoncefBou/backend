import express from 'express';
const app = express();
import cors from 'cors';

const superHeros = [
    {
        name: "Iron Man",
        power: ["money"],
        color: "red",
        isAlive: true,
        age: 46,
        image: "https://blog.fr.playstation.com/tachyon/sites/10/2019/07/unnamed-file-18.jpg?resize=1088,500&crop_strategy=smart"
    },
    {
        name: "Thor",
        power: ["electricty", "worthy"],
        color: "blue",
        isAlive: true,
        age: 300,
        image: "https://www.bdfugue.com/media/catalog/product/cache/1/image/400x/17f82f742ffe127f42dca9de82fb58b1/9/7/9782809465761_1_75.jpg"
    },
    {
        name: "Daredevil",
        power: ["blind"],
        color: "red",
        isAlive: false,
        age: 30,
        image: "https://aws.vdkimg.com/film/2/5/1/1/251170_backdrop_scale_1280xauto.jpg"
    }
]

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

    if(keyFound.length) {
        res.json({message: "Une ou plusieurs de tes keys n'existe pas"})
    } else {
        next()
    }
}

app.use(express.json())
app.use(cors())
app.use(debug)


app.get("/heroes", (req, res) => {
    res.json(superHeros)
})

app.post("/heroes", transformName, (req, res) => {
    let newHeroes = req.body

    const arrayToVerify = superHeros.filter(hero => hero.name.toLowerCase() === newHeroes.name)

    if (arrayToVerify.length) {
        res.json({ message: "Cet héros existe déja !" })
    } else {
        superHeros.push(newHeroes)
        res.json({ message: "Ok, héros ajouté" })
    }
})

app.get("/heroes/:name", (req, res) => {
    console.log(req.params.name);

    let name = req.params.name.toLowerCase()


    const nameFound = superHeros.filter(hero => {
        return hero.name.split(" ").join("").toLowerCase() === name.split(" ").join("")
    })

    if (nameFound.length) {
        res.json(nameFound)
    } else {
        res.json({ message: "Wrong name of heroes man !" })
    }
})

app.delete("/heroes/:name", isNameHeroValid, (req, res) => {
    const name = req.params.name.toLowerCase()

    const nameFound = superHeros.find(hero => {
        return name.split(" ").join("") === hero.name.split(" ").join("").toLowerCase()
    })

    const indexOfNameFound = superHeros.indexOf(nameFound)

    superHeros.splice(indexOfNameFound, 1)

    res.json({ message: `${nameFound.name} effacé correctement` })
})

app.put("/heroes/:name", isNameHeroValid, validateHero, (req, res) => {
    const name = req.params.name.toLowerCase()
    const dataReceived = req.body

    const keyOfDataReceived = Object.keys(dataReceived)
   
    const nameFound = superHeros.find(hero => {
        return name.split(" ").join("") === hero.name.split(" ").join("").toLowerCase()
    })

    for (let i = 0; i < keyOfDataReceived.length; i++) {
        nameFound[keyOfDataReceived[i]] =  dataReceived[keyOfDataReceived[i]]
    }

    res.json({ message: `Ok, les informations sur ${nameFound.name} ont été changées` })

})

app.get("/heroes/:name/powers", (req, res) => {
    let name = req.params.name.toLowerCase()


    const nameFound = superHeros.filter(hero => {
        return hero.name.split(" ").join("").toLowerCase() === name.split(" ").join("")
    })

    if (nameFound.length) {
        res.json(nameFound[0].power)
    } else {
        res.json({ message: "Wrong name of heroes man !" })
    }

})

app.post("/heroes/:name/powers", (req, res) => {
    let name = req.params.name.toLowerCase()
    let newPower = req.body.newPower

    const nameFound = superHeros.filter(hero => {
        return hero.name.split(" ").join("").toLowerCase() === name.split(" ").join("")
    })

    if (nameFound.length) {

        superHeros.forEach((hero, index) => {

            if (hero.name === nameFound[0].name) {
                superHeros[index].power.push(newPower)
            }
        });

        res.json({ message: "Pouvoir ajouté !" })

    } else {
        res.json({ message: "Wrong name of heroes man !" })
    }
})

app.delete("/heroes/:name/power/:power", isNameHeroValid, isPowerHeroValid, (req, res) => {
    const name = req.params.name.toLowerCase()
    const power = req.params.power.toLowerCase()
    console.log('power', power)
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