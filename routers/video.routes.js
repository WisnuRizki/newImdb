const express = require('express')
const router = express.Router()
const {verify} = require("../midlleware/authentication")

const {
    addVideo
} = require('../controllers/video.controller')


router.post('/', verify,addVideo);


module.exports = router ;