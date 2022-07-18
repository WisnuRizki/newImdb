const express = require('express')
const router = express.Router()
const {verify} = require("../midlleware/authentication")

const {
    addFilm,
    allFilm,
    getFilmByTitle,
    getFilmByGenre,
    getFilmByCategory,
    addFilmGenre,
    updateFilm,
    deleteFilm,
    orderByDesc,
    orderByAsce
} = require('../controllers/film.controller');


router.post('/', verify,addFilm);
router.post('/addGenreFilm', verify,addFilmGenre);
router.get('/', allFilm);
router.get('/desc',orderByDesc)
router.get('/asce',orderByAsce)
router.get('/byTitle', getFilmByTitle);
router.get('/byGenre', getFilmByGenre);
router.get('/byCategory', getFilmByCategory);
router.put('/:id',verify,updateFilm);
router.delete('/:id',verify,deleteFilm)


module.exports = router ;