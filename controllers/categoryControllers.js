const Category = require('../model/categoryModel')
const Recipe = require('../model/recipesModel')

exports.GetCategories = (req, res) => {
 const categories = Category.findAll({ where: { type: 'normal' } })  
 .then(regularCategories => {
     Category.findAll({ where: { type: 'holidays' } })  
         .then(holidayCategories => {
             res.render('Recipes/get', {
                 title: 'Рецепти',
                 layout: 'layouts/layout',
                 regularCategories: res.locals.regularCategories,
                 holidayCategories: res.locals.holidayCategories
             });
         })
         .catch(error => {
             console.error(error);
             res.status(500).send('error get holidays type ')
         });
 })
 .catch(error => {
     console.error(error)
     res.status(500).send('server error')
 })

}

 exports.GetCategoryById = async (req,res) => {
            try {
                const categoryId = req.params.id
                const categories = await Category.findByPk(categoryId)
                const recipes = await Recipe.findAll({
                    where: { category_id: categoryId },
                    attributes:['id','image','name','describe', 'category_id', 'user_id']
                });
                res.render('Category/get', {
                    title: 'Рецепти категорії',
                    layout:'layouts/layout',
                    recipes: recipes,
                });
            } catch (error) {
                console.error(error);
                res.status(500).send('server error')
            }
}
