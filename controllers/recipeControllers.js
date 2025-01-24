const User = require('../model/user')
const Recipes = require('../model/recipesModel')
const Category = require('../model/categoryModel')
const path = require('path')
const { Op } = require('sequelize')

  exports.GetRecipes = (req,res) =>{
    Recipes.findAndCountAll({
        include: [
            {
                model: User,
                attributes: ['name']
            },
        ],
        attributes: ['image', 'name', 'describe', 'category_id', 'id', 'user_id'] 
    }).then(result => {
        const recipe = result.rows.map(recipe => recipe.dataValues)
        const recipesWithPermissions = recipe.map(r => {
            return {
                ...r,
                canEdit: req.user ? r.user_id === req.user.id : false 
            };
        });
        res.render('Recipes/get', {
            title: 'Рецепти',
            layout: 'layouts/layout',
            recipe: recipesWithPermissions, 
            currentUserId: req.user ? req.user.id : null,
            isAuthenticated: res.locals.isAuthenticated
            
        });
    }).catch(error => {
        console.error(error)
        res.status(500).send('server error')
    });
  }

  exports.CheckRecipe = async (req,res) => {
    try {
        const recipe = await Recipes.findOne({
            where: { id: req.params.id },
            include: [
                {
                    model: User,
                    attributes: ['name']
                },

                {
                    model: Category,
                    attributes: ['name']
                }
            ],
            attributes: ['image', 'name', 'describe', 'category_id', 'id']
        });
        if (!recipe) {
            return res.status(404).send('recipe not find');
        }
        res.render('Recipes/check', {
            title: 'Рецепт',
            layout: 'layouts/layout',
            recipe: recipe.dataValues ,
            isAuthenticated: res.locals.isAuthenticated

        });
    } catch (error) {
        console.error(error)
        res.status(500).send('server error')
    }
  }

  exports.RenderPost = (req,res)=>{
    res.render('Recipes/post', {
        title: 'Додати рецепт',
        layout: 'layouts/layout',
        isAuthenticated: res.locals.isAuthenticated

    })
  }

  exports.RenderUpdate = async(req,res)=>{
    try {
        const recipe = await Recipes.findByPk(req.params.id);
        if (!recipe) {
            return res.status(404).send('recipe not found')
        }
        if (recipe.user_id !== req.user.id) {
            return res.status(403).send('Недостатньо прав')
        }
        res.render('Recipes/update', {
            title: 'Змінити рецепт',
            layout: 'layouts/layout',
            recipe: recipe.dataValues,
            isAuthenticated: res.locals.isAuthenticated
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('error get recipe')
    }
  }

  exports.PostRecipe = async (req, res) => {
    try {
        const { name, describe, category_id } = req.body
        const user_id = req.user.id
        const image = req.file ? req.file.path : null
        const recipe = await Recipes.create({
            name: name,
            describe: describe,
            image: image,
            category_id: category_id, 
            user_id: user_id
        });
       
        res.status(200).redirect('/recipes/get')
    } catch (error) {
        console.error(error)
        res.status(500).send('error add recipe')
    }
  }

  exports.UpdateRecipe = async (req,res) => {
    try {
        const recipe = await Recipes.findByPk(req.params.id);
        if (!recipe) {
            return res.status(404).send('recipe not found')
        }

        if (recipe.user_id !== req.user.id) {
            return res.status(403).send('not authorized')
        }
        const { name, describe, category_id } = req.body
        recipe.name = name || recipe.name
        recipe.describe = describe || recipe.describe
        recipe.category_id = category_id || recipe.category_id
        if (req.file) {
            recipe.image = req.file.path; 
        }
        await recipe.save()
        res.redirect('/recipes/get')
    } catch (error) {
        console.error(error)
        res.status(500).send('error update recipe')
    }
  }

  exports.DeleteRecipe = async (req, res)=>{
    try {
        const id = req.params.id;
        const recipe = await Recipes.findByPk(id)
        if (!recipe) {
            return res.status(404).send('recipe not found')
        }
        if (recipe.user_id !== req.user.id) {
            return res.status(403).send('не достатньо прав')
        }
        await recipe.destroy();  
        res.redirect('/recipes/get')
    } catch (error) {
        console.error(error);
        res.status(500).send('error delete recipe')
    }
  }

  exports.SearchRecipes = async (req, res) => {
    try {
        const query = req.query.query; 
        if (!query || query.trim() === '') {
            return res.render('recipes/list', {
                title: 'Рецепти',
                recipes: [],
                message: 'Введіть текст для пошуку.',
            });
        }
        const recipes = await Recipes.findAll({
            where: {
                name: {
                    [Op.regexp]: query
                }
            },
            include: [
                {
                    model: User,
                    attributes: ['name']
                },
            ]
        });
        res.render('recipes/list', {
            title: 'Результати пошуку',
            layout:'layouts/layout',
            recipes: recipes,
            isAuthenticated: res.locals.isAuthenticated
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('error fetching recipes:')
    }
  }