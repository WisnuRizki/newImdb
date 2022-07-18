const express = require('express')
const router = express.Router()
const {verify} = require("../midlleware/authentication")

const {
    addPhoto,
    allPhoto,
    updatePhoto,
    deletePhoto
} = require('../controllers/photo.controller')


router.post('/', verify,addPhoto);
router.get('/',allPhoto);
router.put('/:id',verify,updatePhoto)
router.delete('/:id',verify,deletePhoto)



module.exports = router ;