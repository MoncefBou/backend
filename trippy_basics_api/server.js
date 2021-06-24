const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/trippy_basics", { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) {
        console.error('Error !!!', err);
    } else {
        console.log('Connected !');
    }
})

const { hotelRoutes } = require('./routes/hotelRoutes')
const { restaurantRoutes } = require('./routes/restaurantRoutes')

app.use(express.json())
app.use(cors())

app.use('/hotels', hotelRoutes)
app.use('/restaurants', restaurantRoutes)


// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))