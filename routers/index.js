const express = require('express')
const router = express.Router()



const user = require('./user.routes')
const film = require('./film.routes')
const genre = require('./genre.routes')
const category = require('./category.routes')
const actor = require('./actor.routes')
const photo = require('./photo.routes')
const video = require('./video.routes')

router.use('/user', user);
router.use('/film', film);
router.use('/genre', genre);
router.use('/category', category);
router.use('/actor', actor);
router.use('/photo', photo);
router.use('/video', video);



module.exports = router

