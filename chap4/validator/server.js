const express = require('express');
const expressValidator = require("express-validator");
const passwordValidator = require('password-validator');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/validator");



app.use(express.static('public'));

app.use(cors())



// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))