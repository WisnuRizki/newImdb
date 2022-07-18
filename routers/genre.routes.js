const express = require('express')
const router = express.Router()
const {verify} = require("../midlleware/authentication")

const {
    addGenre,
    allGenre,
    updateGenre,
    deleteGenre
} = require('../controllers/genre.controller')


router.post('/', verify,addGenre);
router.get('/',allGenre);
router.put('/:id',verify,updateGenre)
router.delete('/:id',verify,deleteGenre)

module.exports = router ;