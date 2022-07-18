const express = require('express')
const router = express.Router()
const {verify} = require("../midlleware/authentication")

const {
    addCategory,
    allCategory,
    updateCategory,
    deleteCategory
} = require('../controllers/category.controller')


router.post('/', verify,addCategory);
router.get('/',allCategory);
router.put('/:id',verify,updateCategory)
router.delete('/:id',verify,deleteCategory)

module.exports = router ;