const express = require('express');
const router = express.Router()

const { addUser, loginUser, privateAuthorization } = require('../controllers/usersControllers')


router.post('/signup', addUser )

router.post('/login', loginUser )

router.get('/private', privateAuthorization)

module.exports = {usersRoutes : router}