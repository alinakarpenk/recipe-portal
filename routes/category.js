const express = require('express')
const router = express.Router()
const categoryControllers = require('../controllers/categoryControllers')

router.get('/categories', categoryControllers.GetCategories)
router.get('/view/:id', categoryControllers.GetCategoryById)

module.exports = router

