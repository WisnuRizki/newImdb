const express = require('express')
const router = express.Router()
const {verify} = require("../midlleware/authentication")

const {
    addGenre
} = require('../controllers/genre.controller')


router.post('/', verify,addGenre);


module.exports = router ;