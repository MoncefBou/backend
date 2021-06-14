const express = require('express');
const app = express();
const cors = require('cors');
const fs = require("fs");
const path = require("path");
const multer = require('multer');
const upload = multer({ dest: './public/uploads' });
const mongoose = require('mongoose');
const User = require('./models/user');

mongoose.connect("mongodb://localhost:27017/upload");



app.use(express.static('public'));

app.use(cors())

app.post('/upload', upload.single('image'),  (req, res) => {
    console.log(req.file);
    fs.renameSync(req.file.path, path.join(req.file.destination, req.file.originalname));
    res.send("ok");
  });


// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))