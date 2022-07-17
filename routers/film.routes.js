const express = require('express')
const router = express.Router()
const {verify} = require("../midlleware/authentication")

const {
    addFilm,
    allFilm
} = require('../controllers/film.controller')


router.post('/', verify,addFilm);
router.get('/', allFilm);


module.exports = router ;