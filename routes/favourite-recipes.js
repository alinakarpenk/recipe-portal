const express = require('express');
const router = express.Router();
const favouriteControllers = require('../controllers/favouriteControllers')

router.get('/favourite', favouriteControllers.GetFavouriteRecipes)
router.post('/post/:id', favouriteControllers.PostFavouriteRecipe)
router.delete('/delete/:id', favouriteControllers.DeleteFavouriteRecipe)

module.exports = router