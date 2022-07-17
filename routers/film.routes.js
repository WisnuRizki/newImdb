const express = require('express')
const router = express.Router()
const {verify} = require("../midlleware/authentication")

const {
    addFilm,
    allFilm,
    getFilmByTitle,
    getFilmByGenre
} = require('../controllers/film.controller')


router.post('/', verify,addFilm);
router.get('/', allFilm);
router.get('/byTitle', getFilmByTitle);
router.get('/byGenre', getFilmByGenre);


module.exports = router ;