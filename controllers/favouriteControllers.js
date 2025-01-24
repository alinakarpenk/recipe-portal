const User = require('../model/user')
const Recipes = require('../model/recipesModel')
const Favourite = require('../model/favouriteModel')

exports.GetFavouriteRecipes = async (req,res) => {
    try{
        const userId = req.user.id
        const favourite = await Favourite.findAll({
        where: { user_id: userId }, 

        include:[{
            model: Recipes,
            attributes:['id','image','name','describe', 'category_id', 'user_id']
        },
        {
            model: User,
            attributes: ['name']
        }
    ],
    })
        res.render('Page/favourite', {
            title: 'Збережено',
            layout: 'layouts/layout.hbs',
            favourite: favourite,
            isAuthenticated: res.locals.isAuthenticated

        });
     } catch(error) {
        console.error(error)
        res.status(500).send('server error')
    }
}

exports.PostFavouriteRecipe = async (req,res) => {
    try {
        const user = await User.findByPk(req.user.id) 
        const recipeId = req.params.id;
        const recipe = await Recipes.findByPk(recipeId)  
        if (!recipeId) {
            return res.status(400).send('recipe id missing')
        }
        if (!user) {
            console.log('user not found')
            return res.status(404).send('user not found')
        }
        if (!recipe) {
            console.log('recipe not found')
            return res.status(404).send('recipe not found')
        }

        const favourite = await Favourite.create({
            user_id: req.user.id,  
            recipes_id: recipeId   
        });

        res.redirect('/page/favourite')
    } catch (error) {
        console.error(error);
        res.status(500).send('server error')
    }
}

exports.DeleteFavouriteRecipe = async (req,res) => {
    try{
        const favourite_id = req.params.id
        const favourite = await Favourite.findByPk(favourite_id)

        if(!favourite){
            return res.status(404).send('recipe not found')
        }
        await favourite.destroy();
        res.redirect('/page/favourite')

    } catch(error){
        console.error(error);
        res.status(500).send('server error')
    }
}