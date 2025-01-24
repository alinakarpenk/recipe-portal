const express = require('express')
const router = express.Router()
const userControllers = require('../controllers/userControllers')

router.get('/login', userControllers.GetLoginPage)
router.post('/login', userControllers.LoginUser)
router.get('/register', userControllers.RegisterPage)
router.post('/register', userControllers.RegisterUser)
router.get('/profile', userControllers.GetUserProfile)
router.get('/logout', userControllers.UserLogout)


module.exports = router

