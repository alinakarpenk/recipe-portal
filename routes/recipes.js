const express = require('express')
const router = express.Router()
const authenticateToken = require('../Middleware/authMiddleware')
const multer  = require('multer')
const recipeControllers = require('../controllers/recipeControllers')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        const extname = path.extname(file.originalname) 
        const filename = Date.now() + extname
        cb(null, filename)
    }
});

const upload = multer({
    storage: storage,    
    fileFilter: function (req, file, cb) {
      const filetypes = /jpeg|jpg|png/;
      if (filetypes) {
        return cb(null, true)
      } else {
        cb(new Error('only: jpeg, jpg, png '))
      }
    }
  })
  
router.get('/get', recipeControllers.GetRecipes)
router.get('/check/:id', recipeControllers.CheckRecipe)
router.get('/post', authenticateToken, recipeControllers.RenderPost)
router.post('/post', authenticateToken, upload.single('image'), recipeControllers.PostRecipe)
router.get('/update/:id', authenticateToken, recipeControllers.RenderUpdate )
router.put('/update/:id', authenticateToken, upload.single('image'), recipeControllers.UpdateRecipe)
router.delete('/delete/:id', authenticateToken, recipeControllers.DeleteRecipe)
router.get('/search', authenticateToken, recipeControllers.SearchRecipes)

module.exports = router
