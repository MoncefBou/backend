const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const { usersRoutes } = require('./routes/usersRoutes')
const User = require('./models/user')

mongoose.connect("mongodb://localhost:27017/validator");


app.use(express.json())
app.use(express.static('public'));
app.use(cors())


app.get("/", async (req, res) => {
    try {
        
        const allUsers = await User.find()

        res.json(allUsers)

    } catch (error) {
        res.status(500).json({ errorMessage: "There was a problem !!!" })
    }
} )

app.use("/users", usersRoutes)




// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))