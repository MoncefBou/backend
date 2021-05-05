import express from 'express';
const app = express();
import cors from 'cors';
app.use(cors())

import movies from './dataCatalog.json';


app.get("/movies", (req, res) => {
    res.json(movies)
})

app.get("/movies/:id", (req, res) => {
    let id = parseInt(req.params.id)

    const theMovie = movies.filter(elem => elem.id === id);

    res.json(theMovie)
})

// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))