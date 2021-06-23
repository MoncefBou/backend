const express = require('express');
const router = express.Router()

const expressValidator = require("express-validator");
const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')

const User = require('../models/users')
const config = require('../config')




router.post('/signup',
    expressValidator.body("email").notEmpty().trim().isEmail().normalizeEmail(),
    expressValidator.body('password').isLength({ min: 8 }),
    async (req, res) => {
        try {

            console.log(req.body);

            const email = req.body.email
            const firstname = req.body.firstname
            const surname = req.body.surname
            const password = bcryptjs.hashSync(req.body.password)
            const date_of_birth = req.body.date_of_birth

            await User.create({ email, firstname, surname, password, date_of_birth })

            res.status(200).json({ message: 'User created' })
        } catch (error) {
            res.status(500).json({ message: "error sorry" })
        }
    })

router.post('/login', async (req, res) => {
    try {
        const email = req.body.email
        const password = req.body.password

        const userInfo = await User.findOne({ email })
        if (!userInfo) {
            res.status(401).json("Wrong mail or password")
        } else {
            const result = bcryptjs.compareSync(password, userInfo.password)

            if (!result) {
                res.status(401).json("Wrong username or password")
            } else {
                const token = jwt.sign({ id: userInfo._id }, config.privateKey, { expiresIn: 60 * 60 })

                res.status(200).json({ message: "connexion success ", token })
            }
        }
    } catch (error) {
        res.status(500).json({ message: "error sorry" })
    }
})

router.get('/admin', (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1]
        const result = jwt.verify(token, config.privateKey)
        if (result) {
            res.status(200).json("Access authorized")
        }
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            res.status(401).json({ message: "token expired" })
        } else {
            res.status(500).json({ message: "error sorry", error })
        }
    }
})

module.exports = { usersRoutes: router }