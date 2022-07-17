const express = require('express')
const router = express.Router()
const {verify} = require("../midlleware/authentication")

const {
    addPhoto
} = require('../controllers/photo.controller')


router.post('/', verify,addPhoto);


module.exports = router ;