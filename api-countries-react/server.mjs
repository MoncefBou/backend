import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors())

import countries from "./dataCountries.mjs";

app.get("/countries", (req, res) => {
    res.json(countries)
})

app.get("/countries/:name", (req, res) => {
    let name = req.params.name

    const nameEnter = countries.filter(function (elem) {
        return elem.name.toUpperCase() === name.toUpperCase();
    })

    res.json(nameEnter)
})

// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))

