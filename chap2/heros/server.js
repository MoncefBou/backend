const express = require('express');
const app = express();
const cors = require('cors');

const mongoose = require('mongoose');
const Heros = require('./models/heros');
mongoose.connect("mongodb://localhost:27017/avengers",  { useNewUrlParser: true, useUnifiedTopology: true })


const { heroesRoutes } = require ('./routes/heroesRoutes')
const { debug } = require('./middlewares/heroesMiddlewares')


app.use(express.json())
app.use(cors())
app.use(debug)


app.use("/heroes", heroesRoutes)


// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))

// --experimental-json-modules