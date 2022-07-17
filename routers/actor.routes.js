const express = require('express')
const router = express.Router()
const {verify} = require("../midlleware/authentication")

const {
    addActor
} = require('../controllers/actor.controller')


router.post('/', verify,addActor);


module.exports = router ;