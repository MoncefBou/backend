const express = require('express');
const app = express();
const cors = require('cors');

const { usersRoutes } = require('./routes/usersRoutes')

const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/login", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json())
app.use(cors())

app.use('/', usersRoutes)


// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))