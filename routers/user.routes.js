const express = require('express')
const router = express.Router()

const {
    signUp,
    login,
e
} = require('../controllers/user.controller')

router.post('/register',signUp);
router.post('/login', login);


module.exports = router ;