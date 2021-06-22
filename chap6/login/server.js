const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('./config')



mongoose.connect("mongodb://localhost:27017/login", { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.json())
app.use(cors())


app.post('/signup', async (req, res) => {
    try {
        const username = req.body.username
        const password = bcrypt.hashSync(req.body.password)

        const newUser = await User.create({ username, password })

        res.json(newUser)

    } catch (error) {
        res.status(500).json({ message: "error sorry" })
    }
})

app.post('/login', async (req, res) => {
    try {
        const username = req.body.username
        const password = req.body.password

        const userInfo = await User.findOne({ username })
        if (!userInfo) {
            res.status(401).json("Wrong username or password")
        } else {
            const result = bcrypt.compareSync(password, userInfo.password)
            
            if (!result) {
                res.status(401).json("Wrong username or password")
            } else {
                const jwToken = await jwt.sign({ id: userInfo._id }, config.privateKey, { expiresIn: 60 * 60 })
                console.log(jwToken)
                
                res.json({message: "connexion success ", jwToken})
            }
        }

    } catch (error) {
        res.status(500).json({ message: "error sorry" })
    }

})

app.get('/private', async(req, res) => {
    try {
        res.json("test ok")
    } catch (error) {
        res.status(500).json({ message: "error sorry" })
    }
})


// SERVER
const port = 8000;
app.listen(port, () => console.log('Server', port))