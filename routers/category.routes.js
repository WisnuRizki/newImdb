const express = require('express')
const router = express.Router()
const {verify} = require("../midlleware/authentication")

const {
    addCategory
} = require('../controllers/category.controller')


router.post('/', verify,addCategory);


module.exports = router ;