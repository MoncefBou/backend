const mongoose = require('mongoose');
const User = require('../models/user')

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../config')


const addUser = async (req, res) => {
    try {
        const username = req.body.username
        const password = bcrypt.hashSync(req.body.password)

        const newUser = await User.create({ username, password })

        res.json(newUser)

    } catch (error) {
        res.status(500).json({ message: "error sorry" })
    }
}

const loginUser = async (req, res) => {
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

                res.json({ message: "connexion success ", jwToken })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "error sorry" })
    }

}

const privateAuthorization = async (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const result = await jwt.verify(token, config.privateKey)

        if (result) {
            res.json("Access authorized")
        }
    } catch (error) {
        res.status(500).json({ message: "error sorry" })
    }
}


module.exports = { addUser, loginUser, privateAuthorization }