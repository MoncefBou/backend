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


app.use(express.json())
app.use(cors())
app.use(debug)


app.get("/heroes", (req, res) => {
    res.json(superHeros)
})

app.get("/heroes/:name", (req, res) => {
    let name = req.params.name.toLowerCase()


    const nameFound = superHeros.filter(hero => {
      return  hero.name.split(" ").join("").toLowerCase() === name
    })

    if (nameFound.length) {
        res.json(nameFound)
    } else {
        res.json({ message: "Wrong name of heroes man !" })
    }
})

app.get("/heroes/:name/powers", (req, res) => {
    let name = req.params.name.toLowerCase()


    const nameFound = superHeros.filter(hero => {
      return  hero.name.split(" ").join("").toLowerCase() === name
    })

    if (nameFound.length) {
        res.json(nameFound[0].power)
    } else {
        res.json({ message: "Wrong name of heroes man !" })
    }
   
})


// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))

// --experimental-json-modules